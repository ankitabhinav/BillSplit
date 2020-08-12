import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { Input, Button, Text, Card, Overlay, CheckBox } from 'react-native-elements'
import api from '../api'
import AsyncStorage from '@react-native-community/async-storage';


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



    useEffect(() => {
        setModalState(!modalState);

    }, [props.modal])

    const handleBillDescriptionInput = (e) => {
        setBillDescriptionInput(e)
       // let res = e.match(/\bmovie|\bfood|\brecharge|\bgrocery|\brent|\bmedicine|\bmedical|\bcab|\bauto|\btaxi|\bbus|\bpetrol|\bdiesel|\bplane|\bflight|\belectricity|\bwater|\bgas|\binternet|\bnet|\bwifi|\bbroadband/gi)
       // if(!res) return setDescIcon('file-document')

        if(e.match(/cab|auto|taxi|bus/)) {
            setDescIcon('taxi')
        } else
        
        if(e.match(/electricity/)) {
            setDescIcon('flash')
        } else
        
        if(e.match(/petrol|diesel|cng/)) {
            setDescIcon('gas-station')
        } else

        if(e.match(/medicine|doctor|hospital/)) {
            setDescIcon('stethoscope')
        } else

        if(e.match(/plane|flight|aeroplane|airplane/)) {
            setDescIcon('airplane')
        } else

        if(e.match(/water/)) {
            setDescIcon('water')
        } else

        if(e.match(/rent/)) {
            setDescIcon('home')
        } else

        if(e.match(/grocery|shop|shopping/)) {
            setDescIcon('cart')
        } else

        if(e.match(/wifi|net|internet|broadband/)) {
            setDescIcon('flash')
        } else

        if(e.match(/food|burger|bread|drink/)) {
            setDescIcon('food')
        } else 
        {
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

    const handleSubmit = async () => {
      
        if (billDescriptionInput === null || billDescriptionInput.length < 1) {
            setErrorType('billDescError')
            return setErrorMessage('Bill description is empty')
        }

        if (billAmountInput === null || billAmountInput.length < 1) {
            setErrorType('billAmountError')
            return setErrorMessage('Bill amount is empty')
        }

        if(lent === true && (lentToInput === null || lentToInput.length < 1)) {
            setErrorType('lentToError')
            return setErrorMessage('Borrower email is empty')
        }
        setErrorMessage({ type: null, message: null });

        // console.log('member : ' + memberEmail + 'id : ' + props.group_id)
        
        try {
            setSpinner(true);

            let response = await api.post('/groups/transaction/add', {
                group_id: props.group_id,
                amount:billAmountInput,
                type: splitEqually ? 'split' :'lent',
                purpose: billDescriptionInput,
                to : lent ? lentToInput : null
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


    return (
        <Overlay
            isVisible={true}
            windowBackgroundColor="rgba(255, 255, 255, .5)"
            overlayBackgroundColor="red"
            animationType='fade'
            onBackdropPress={props.onPress}

        >
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

                    />}

                <Button
                    title="Add"
                    loading={spinner}
                    containerStyle={{ width: '40%', alignSelf: 'center' }}
                    raised={true}
                    onPress={handleSubmit}

                />

            </View>

        </Overlay>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,

    }
});

export default AddBill;
