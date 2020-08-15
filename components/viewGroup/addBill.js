import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { Input, Button, Text, Card, Overlay, CheckBox, ListItem } from 'react-native-elements'
import api from '../api'
import AsyncStorage from '@react-native-community/async-storage';
import { getIcons } from '../customIcon'
import { ScrollView } from 'react-native-gesture-handler';

const AddBill = (props) => {

    const [spinner, setSpinner] = useState(null);
    const [modalState, setModalState] = useState(true);
    const [billAmountInput, setBillAmountInput] = useState(null);
    const [billDescriptionInput, setBillDescriptionInput] = useState(null);
    const [billNameInput, setBillNameInput] = useState(null);
    const [billTypeInput, setBillTypeInput] = useState(null);
    const [lentToInput, setLentToInput] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [errorType, setErrorType] = useState(null);
    const [splitEqually, setSplitEqually] = useState(true);
    const [lent, setLent] = useState(false);
    const [descIcon, setDescIcon] = useState('file-document')
    const [viewMembers, setViewMembers] = useState(false);
    const [members, setMembers] = useState(null)




    useEffect(() => {
        setModalState(!modalState);

    }, [props.modal])

    const handleBillDescriptionInput = (e) => {
        setBillDescriptionInput(e)
        let iconname = getIcons(e);
        setDescIcon(iconname);
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

    const getMembers = async () => {
        console.log('fetch members called')
        setSpinner(true);

        try {
            let response = await api.get('groups/member?group_id=' + props.group_id);

            if (response.data.success === true) {
                setMembers(response.data.data)
                setSpinner(false);
                return

            } else {
                setSpinner(false);
                return console.log(response.data.status)
            }
        }
        catch (err) {
            setSpinner(false);
            return console.log(err.response.data.status)
        }


    }

    const handleSubmit = async () => {

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
        setErrorMessage({ type: null, message: null });

        // console.log('member : ' + memberEmail + 'id : ' + props.group_id)

        try {
            setSpinner(true);

            let response = await api.post('/groups/transaction/add', {
                group_id: props.group_id,
                amount: billAmountInput,
                type: splitEqually ? 'split' : 'lent',
                purpose: billDescriptionInput,
                to: lent ? lentToInput : null
            })

            console.log(response.data)

            if (response.data.success === true) {
                setSpinner(false);
                props.onPress();
                props.refresh();
                return Alert.alert(
                    'Success',
                    'Bill Added',
                    [
                        { text: 'OK' },
                    ],
                    { cancelable: false },
                );
            } else {
                setSpinner(false);
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

    const handleViewMembers = () => {
        setViewMembers(true);
        getMembers();
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
                {!viewMembers &&
                    <View style={{ width: 300, marginBottom: 10 }}>
                        <Text h4 style={{ marginHorizontal: 10, marginVertical: 10, fontWeight: '100' }}>Add Bill</Text>

                        <Input
                            placeholder='Enter Description For Bill'
                            errorStyle={{ color: 'red' }}
                            errorMessage={errorType === 'billDescError' ? errorMessage : null}
                            onChangeText={handleBillDescriptionInput}
                            disabled={spinner}
                            value={billDescriptionInput}
                            leftIcon={{ type: 'material-community', name: descIcon, color: '#607d8b' }}

                        />

                        <Input
                            placeholder='Enter Amount'
                            errorStyle={{ color: 'red' }}
                            errorMessage={errorType === 'billAmountError' ? errorMessage : null}
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
                        />
                        <CheckBox
                            title='Lent'
                            checkedIcon='dot-circle-o'
                            uncheckedIcon='circle-o'
                            checked={lent}
                            onPress={() => { setSplitEqually(false); setLent(true); }}
                        />

                        {lent &&
                            <Input
                                placeholder='Enter borrower email adress'
                                errorStyle={{ color: 'red' }}
                                errorMessage={errorType === 'lentToError' ? errorMessage : null}
                                onChangeText={handleLentToInput}
                                disabled={spinner}
                                value={lentToInput}
                                leftIcon={{ type: 'material-community', name: 'at', color: '#607d8b' }}
                                onFocus={handleViewMembers}

                            />}

                        <Button
                            title="Add"
                            loading={spinner}
                            containerStyle={{ width: '40%', alignSelf: 'center' }}
                            raised={true}
                            onPress={handleSubmit}

                        />

                    </View>
                }
                {viewMembers &&
                    <View style={{ width: 300, height: 435, marginBottom: 10, }}>
                        <Text h4 style={{ marginHorizontal: 10, marginVertical: 10, fontWeight: '100' }}>Select Member</Text>

                        <ScrollView>
                            {members &&
                                members.map((item, i) => (
                                    <ListItem
                                        key={i}
                                        // leftAvatar={{ source: { uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg' } }}
                                        leftIcon={{ name: 'account-circle-outline', type: 'material-community', size: 40, color: '#9e9e9e' }}
                                        title={item.email.split('@')[0]}
                                        //subtitle={item.email === created_by ? 'Admin' : 'Member'}
                                        bottomDivider
                                        style={{ marginVertical: 2, marginHorizontal: 2 }}
                                        //rightIcon={() => right(item.email)}
                                        onPress={() =>  {setLentToInput(item.email); setViewMembers(false)} }
                                    />
                                ))
                            }
                        </ScrollView>


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
