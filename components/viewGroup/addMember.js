import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Alert, TouchableOpacity } from 'react-native';
import { Input, Button, Text, Card, Overlay, Icon } from 'react-native-elements'
import api from '../api'
import AsyncStorage from '@react-native-community/async-storage';
import { RNCamera } from 'react-native-camera'


const AddMember = (props) => {

    const [spinner, setSpinner] = useState(null);
    const [modalState, setModalState] = useState(true);
    const [memberEmail, setMemberEmail] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [scanSection, setScanSection] = useState(false);



    useEffect(() => {
        setModalState(!modalState);

    }, [props.modal])

    const handleMemberInput = (e) => {
        setMemberEmail(e);
    }

    const handleSubmit = async () => {
        if (memberEmail === null || memberEmail.length < 1) {
            return setErrorMessage('Member email is empty')
        }
        if (memberEmail.length < 5) {
            return setErrorMessage('Enter atleast 5 characters')
        }
        setErrorMessage(null);

        console.log('member : ' + memberEmail + 'id : ' + props.group_id)

        try {
            setSpinner(true);

            let response = await api.post('/groups/member/add', {
                group_id: props.group_id,
                member: memberEmail
            })

            console.log(response.data)

            if (response.data.success === true) {
                setSpinner(false);
                props.onPress();
                props.refresh();
                return Alert.alert(
                    'Success',
                    'Member Added',
                    [
                        { text: 'OK' },
                    ],
                    { cancelable: false },
                );
            } else {
                setSpinner(false);
                return Alert.alert(
                    'Error',
                    response.data.status,
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

    function ValidateEmail(mail) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
            return (true)
        }
        
        return (false)
    }

    const ScanQRCode = () => {
        return (
            <TouchableOpacity onPress={() => setScanSection(true)}>
                <Icon
                    name='qrcode-scan'
                    type='material-community'
                    color='#424242'
                    //raised={true}
                    containerStyle={{ marginHorizontal: 10 }}
                //onPress={openAddBill}
                />

            </TouchableOpacity>
        )
    }

    const barcodeRecognized = ({barcodes}) => {
        if(ValidateEmail(barcodes[0].data)) {
            setScanSection(false);
            setMemberEmail(barcodes[0].data)
            return  console.log(barcodes[0].data);    
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
            <View style={{ width: 300, height:scanSection ? 400 : 300}}>
                {!scanSection &&
                    <>
                        <Text h4 style={{ marginHorizontal: 10, marginVertical: 10, fontWeight: '100' }}>Add Member</Text>
                        <View style={{ marginTop: 50 }}>
                            <Input
                                placeholder='Enter member email adress'
                                errorStyle={{ color: 'red' }}
                                errorMessage={errorMessage}
                                onChangeText={handleMemberInput}
                                disabled={spinner}
                                rightIcon={<ScanQRCode />}
                                value={memberEmail}

                            />

                            <Button
                                title="Add"
                                loading={spinner}
                                containerStyle={{ width: '40%', alignSelf: 'center' }}
                                raised={true}
                                onPress={handleSubmit}

                            />
                        </View>
                    </>
                }
                {scanSection &&
                    <>
                        <View style={{ flexDirection: 'row' }}>
                            <Text h4 style={{ marginHorizontal: 10, marginVertical: 10, fontWeight: '100' }}>Scan QR Code</Text>
                            <View style={{ justifyContent: 'center', flex: 1 }}>
                                <TouchableOpacity onPress={() => setScanSection(false)}>
                                    <Icon
                                        name='arrow-left'
                                        type='material-community'
                                        color='#424242'
                                        //raised={true}
                                        containerStyle={{ marginRight: -40 }}
                                    //onPress={openAddBill}
                                    />

                                </TouchableOpacity>



                            </View>


                        </View>
                        <View style={styles.container}>
                        <RNCamera
                                style={styles.scanner}
                                onGoogleVisionBarcodesDetected={barcodeRecognized}
                                captureAudio={false}
                                ratio={'4:4'}
                                
                            />
                        </View>
                           
                      
                    </>
                }


            </View>

        </Overlay>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
        alignItems:'center'
      },
      scanner: {
       // flex: 1,
        //padding:-10,
        marginTop:60,
        height:200,
        width:'95%',
      },

});

export default AddMember;
