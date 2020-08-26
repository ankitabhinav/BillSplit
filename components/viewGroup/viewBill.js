import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Alert, TouchableOpacity } from 'react-native';
import { Input, Button, Text, Card, Overlay, CheckBox } from 'react-native-elements'
import api from '../api'
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'


const AddBill = (props) => {

    const [spinner, setSpinner] = useState(true);
    const [modalState, setModalState] = useState(true);
    const [billAmountInput, setBillAmountInput] = useState(null);
    const [billDescriptionInput, setBillDescriptionInput] = useState(null);
    const [billNameInput, setBillNameInput] = useState(null);
    const [billTypeInput, setBillTypeInput] = useState(null);
    const [lentToInput, setLentToInput] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [errorType, setErrorType] = useState(null);
    const [splitEqually, setSplitEqually] = useState(false);
    const [lent, setLent] = useState(false);
    const [descIcon, setDescIcon] = useState('file-document')
    const [showDelete, setShowDelete] = useState(false);

    const [settleSpinner, setSettleSpinner] = useState(false);
    const [deleteSpinner, setDeleteSpinner] = useState(false);
    const [lockFields, setLockFields] = useState(false);


    useEffect(() => {
        console.log(props)
        setBillAmountInput(props.amount);
        setBillDescriptionInput(props.description);
        props.type === 'split' ? setSplitEqually(true) : setLent(true);
        if (props.to) setLentToInput(props.to)

    }, [])



    useEffect(() => {
        setModalState(!modalState);

    }, [props.modal])

    const handleBillDescriptionInput = (e) => {
        setBillDescriptionInput(e)
        // let res = e.match(/\bmovie|\bfood|\brecharge|\bgrocery|\brent|\bmedicine|\bmedical|\bcab|\bauto|\btaxi|\bbus|\bpetrol|\bdiesel|\bplane|\bflight|\belectricity|\bwater|\bgas|\binternet|\bnet|\bwifi|\bbroadband/gi)
        // if(!res) return setDescIcon('file-document')

        if (e.match(/cab|auto|taxi|bus/)) {
            setDescIcon('taxi')
        } else

            if (e.match(/electricity/)) {
                setDescIcon('flash')
            } else

                if (e.match(/petrol|diesel|cng/)) {
                    setDescIcon('gas-station')
                } else

                    if (e.match(/medicine|doctor|hospital/)) {
                        setDescIcon('stethoscope')
                    } else

                        if (e.match(/plane|flight|aeroplane|airplane/)) {
                            setDescIcon('airplane')
                        } else

                            if (e.match(/water/)) {
                                setDescIcon('water')
                            } else

                                if (e.match(/rent/)) {
                                    setDescIcon('home')
                                } else

                                    if (e.match(/grocery|shop|shopping/)) {
                                        setDescIcon('cart')
                                    } else

                                        if (e.match(/wifi|net|internet|broadband/)) {
                                            setDescIcon('flash')
                                        } else

                                            if (e.match(/food|burger|bread|drink/)) {
                                                setDescIcon('food')
                                            } else {
                                                setDescIcon('file-document')
                                            }



    }
    const handleBillNameInput = (e) => {
        setBillNameInput(e)
    }
    const handleBillTypeInput = (e) => {
        setBillTypeInput(e)
    }
    const handleLentToInput = (e) => {
        setLentToInput(e)
    }
    const handleBillAmountInput = (e) => {
        setBillAmountInput(e);
    }


    const handleUpdate = async () => {
        // return
        if (billDescriptionInput === null || billDescriptionInput.length < 1) {
            setErrorType('billDescError')
            return setErrorMessage('Bill description is empty')
        }

        if (billAmountInput === null || billAmountInput.length < 1) {
            setErrorType('billAmountError')
            return setErrorMessage('Bill amount is empty')
        }

        if (lent === true && (lentToInput === null || lentToInput.length < 1)) {
            setErrorType('lentToError')
            return setErrorMessage('Borrower email is empty')
        }
        setErrorMessage('');

        // console.log('member : ' + memberEmail + 'id : ' + props.group_id)

        try {
            setSpinner(true);
           // setLockFields(true);

            let response = await api.put('/groups/transaction/update', {
                group_id: props.group_id,
                transaction: { started_by: props.started_by, amount: props.amount, type: props.type, purpose: props.description, to: props.to },
                amount: billAmountInput,
                type: splitEqually ? 'split' : 'lent',
                purpose: billDescriptionInput,
                to: lent ? lentToInput : null
            })

            console.log(response.data)

            if (response.data.success === true) {
                setSpinner(false);
            setLockFields(false);

                props.onPress();
                props.refresh();
                return Alert.alert(
                    'Success',
                    'Bill Updated',
                    [
                        { text: 'OK' },
                    ],
                    { cancelable: false },
                );
            } else {
                setSpinner(false);
            setLockFields(false);

                return Alert.alert(
                    'Error',
                    'Something went wrong !',
                    [
                        { text: 'OK' },
                    ],
                    { cancelable: false },
                );
            }
        } catch (err) {
            console.log(err.response.data)
            setSpinner(false);
            setLockFields(false);

            return Alert.alert(
                'Error',
                'Something went wrong !!',
                [
                    { text: 'OK' },
                ],
                { cancelable: false },
            );
        }

    }

    const handleViewLayout = (event) => {
        console.log('view layout fired')
        var { x, y, width, height } = event.nativeEvent.layout;
        console.log(x, y, width, height);
    }

    const handleDelete = () => {
        setShowDelete(true);
    }

    const confirmDelete = async () => {
        let item = {
            "started_by": props.started_by,
            "amount": props.amount,
            "type": props.type,
            "purpose": props.description,
            "to": props.to
        }

        //axios does not support request body in delete mode , thats why we need to send body inside data 
        try {
            setDeleteSpinner(true);
           // setLockFields(true);

            let response = await api.delete('/groups/transaction/delete',
                {
                    data: {
                        group_id: props.group_id,
                        transaction: item
                    }
                }
            );
            console.log(response.data)
            if (response.data.success === true) {
                setDeleteSpinner(false);
            setLockFields(false);

                props.refresh();
                props.onPress();

                return Alert.alert(
                    'Deleted !',
                    'Bill Deleted Successfully',
                    [
                        { text: 'OK' },
                    ],
                    { cancelable: false },
                );

            } else {
                return alert(response.data.status)
            }
        } catch (err) {
            setDeleteSpinner(false);
            setLockFields(false);


            Alert.alert(
                'Error',
                'Something went wrong !',
                [
                    { text: 'OK' },
                ],
                { cancelable: false },
            );
            // return console.log(err.response.data.status)
        }

        console.log(item);
    }


    const handleBillSettle = async () => {
        console.log('settle called')
        setSettleSpinner(true);

       // setLockFields(true);

        try {
            let response = await api.put('/groups/transaction/settle', {
                group_id: props.group_id,
                transaction: { started_by: props.started_by, amount: props.amount, type: props.type, purpose: props.description, to: props.to },
                isSettled: props.isSettled ? false : true
            })

            if (response.data.success === true) {
                setSettleSpinner(false);
            setLockFields(false);

                props.onPress();
                props.refresh();
                return  Alert.alert(
                    'Success',
                    props.isSettled ? 'Bill Unsettled' : 'Bill Settled',
                    [
                        { text: 'OK' },
                    ],
                    { cancelable: false },
                );
            } else {
                console.log(response.data);
                setSettleSpinner(false);
            setLockFields(false);


                return  Alert.alert(
                    'Error',
                    'Something went wrong',
                    [
                        { text: 'OK' },
                    ],
                    { cancelable: false },
                );
            }
        } catch (err) {
            console.log(err.response);
            setSettleSpinner(false);
            setLockFields(false);

            return  Alert.alert(
                'Error',
                'Something went wrong',
                [
                    { text: 'OK' },
                ],
                { cancelable: false },
            );
        }
    }


    return (
        <Overlay
            isVisible={true}
            windowBackgroundColor="rgba(255, 255, 255, .5)"
            overlayBackgroundColor="red"
            animationType='fade'
            onBackdropPress={props.onPress}

        >
            <>
                {!showDelete &&
                    <View style={{ width: 300, marginBottom: 10 }} onLayout={handleViewLayout}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text h4 style={{ marginHorizontal: 10, marginVertical: 10, fontWeight: '100' }}>View Bill</Text>
                            {spinner &&
                                <>
                                    {!props.isSettled &&
                                    <View style={{ justifyContent: 'center', flex: 1 }}>
                                        <TouchableOpacity onPress={() => {settleSpinner ? null : setSpinner(false)}}>
                                            <Icon style={{ alignSelf: 'flex-end', marginHorizontal: 10 }} name='square-edit-outline' size={20} />
                                        </TouchableOpacity>

                                    </View>
                                    }
                                </>
                            }


                        </View>



                        <Input
                            placeholder='Enter Description For Bill'
                            errorStyle={{ color: 'red' }}
                            errorMessage={errorType === 'billDescError' ? errorMessage : ''}
                            onChangeText={handleBillDescriptionInput}
                            disabled={spinner}
                            value={billDescriptionInput}
                            leftIcon={{ type: 'material-community', name: descIcon, color: '#607d8b' }}

                        />

                        <Input
                            placeholder='Enter Amount'
                            errorStyle={{ color: 'red' }}
                            errorMessage={errorType === 'billAmountError' ? errorMessage : ''}
                            onChangeText={handleBillAmountInput}
                            disabled={spinner}
                            value={billAmountInput}
                            keyboardType='numeric'
                            leftIcon={{ type: 'material-community', name: 'currency-inr', color: '#607d8b' }}

                        />


                        <CheckBox
                            title='Split Equally'
                            checkedIcon='dot-circle-o'
                            uncheckedIcon='circle-o'
                            checked={splitEqually}
                            onPress={() => { setSplitEqually(true); setLent(false); }}
                            disabled={spinner}
                        />
                        <CheckBox
                            title='Lent'
                            checkedIcon='dot-circle-o'
                            uncheckedIcon='circle-o'
                            checked={lent}
                            onPress={() => { setSplitEqually(false); setLent(true); }}
                            disabled={spinner}
                        />

                        {lent &&
                            <Input
                                placeholder='Enter borrower email adress'
                                errorStyle={{ color: 'red' }}
                                errorMessage={errorType === 'lentToError' ? errorMessage : ''}
                                onChangeText={handleLentToInput}
                                disabled={spinner}
                                value={lentToInput}
                                leftIcon={{ type: 'material-community', name: 'at', color: '#607d8b' }}

                            />}

                        {!spinner &&
                            <Button
                                title="Update"
                                loading={spinner}
                                containerStyle={{ width: '40%', alignSelf: 'center' }}
                                raised={true}
                                onPress={handleUpdate}
                                disabled={lockFields}

                            />
                        }

                        {spinner &&
                            <>
                                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                    <Button
                                        title="Delete"
                                        loading={deleteSpinner}
                                        containerStyle={{ width: '30%', alignSelf: 'center', marginRight: 15 }}
                                        raised={true}
                                        onPress={handleDelete}
                                        disabled={settleSpinner ? true : false}

                                    />
                                    <Button
                                        title={props.isSettled ? "Unsettle" : "Settle"}
                                        loading={settleSpinner}
                                        containerStyle={{ width: '30%', alignSelf: 'center' }}
                                        raised={true}
                                        onPress={handleBillSettle}
                                        disabled={deleteSpinner ? true : false}

                                    />
                                </View>

                            </>
                        }

                    </View>
                }
                {showDelete &&
                    <View style={{ width: 300, height: 360, marginBottom: 10, alignItems: 'center', justifyContent: 'center' }}>
                        <Text h5>Are you sure you want to delete this bill ?</Text>
                        <View style={{ flexDirection: 'row', width: 300, justifyContent: 'center' }}>
                            <Button
                                title="Yes"
                                loading={deleteSpinner}
                                containerStyle={{ width: '20%', margin: 10 }}
                                raised={true}
                                onPress={confirmDelete}
                                //disabled={lockFields}
                            />
                            <Button
                                title="No"
                                // loading={spinner}
                                containerStyle={{ width: '20%', margin: 10 }}
                                raised={true}
                                onPress={() => setShowDelete(false)}
                                disabled={deleteSpinner ? true : false}

                            />
                        </View>

                    </View>
                }
            </>
        </Overlay>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,

    }
});

export default AddBill;
