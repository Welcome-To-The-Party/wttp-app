//import liraries
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ProgressSteps, ProgressStep } from '../../components/react-native-progress-steps';
import {DEV_URL } from '@env'
import { store } from '@store/configureStore'

import { colors } from '@styles'
import FirstStep from './FirstStep';
import SecondStep from './SecondStep';
import ThirdStep from './ThirdStep';
import FourthStep from './FourthStep';
import { navigate } from '../../providers/navigationService';
import AlertError from '../../components/AlertError';

const progressStepsStyle = {
    activeStepIconBorderColor: colors.PRIMARY,
    activeLabelColor: colors.PRIMARY,
    activeStepNumColor: colors.WHITE,
    activeStepIconColor: colors.PRIMARY,
    completedStepIconColor: colors.PRIMARY,
    completedProgressBarColor: colors.PRIMARY,
    completedCheckColor: colors.WHITE
};


// create a component
const CreatEventScreen = () => {

    const [activeStep, setActiveStep] = useState(0)
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [musicType, setMusicType] = useState("")
    const [type, setType] = useState("")
    const [placeType, setPlaceType] = useState("")
    const [maxAllowed, setMaxAllowed] = useState(15);
    const [price, setPrice] = useState(10);
    const [smoke, setSmoke] = useState(true)
    const [pictures, setPictures] = useState([])
    const [showModal, setShowModal] = useState(false);
    const [additionalInfos, setAdditionalInfos] = useState()
    const [manualValidation, setManualValidation] = useState(null)
    const [startTime, setStartTime] = useState("")
    const [endTime, setEndTime] = useState("")
    const [phone, setPhone] = useState("")
    const [messageError, setMessageError] = useState("")
    const [address, setAddress] = useState({
        address: '',
        latitude: '',
        longitute: ''
    })
    
    const nextStep = (step) => {
        console.log("-----------", step)
        
        if(step == 1){
            if(
                title == '' || 
                description == '' || 
                address.address == ''
            ) setMessageError("Veuillez remplir tous les champs")
            else{
                setMessageError("")
                setActiveStep(step)
            }
        }
        else if(step == 2){
            if(
                musicType == '' || 
                placeType == '' || 
                type == ''
            ) setMessageError("Veuillez remplir tous les champs")
            else{
                setMessageError("")
                setActiveStep(step)
            }
        } 
        else if(step == 3){
            if(pictures.length == 0) setMessageError("Veuillez remplir tous les champs")
            else{
                setMessageError("")
                setActiveStep(step)
            }
        }
        else if(step == 4){
            if(
                manualValidation == null || 
                startTime == "" || 
                endTime == ""
            ) setMessageError("Veuillez remplir tous les champs")
            else{
                setShowModal(true)
            }
        }
    }

    const onPrevious = () => {
        setActiveStep(activeStep - 1)
    }

    const showRecap = () => {
        var data = new FormData();
        data.append('title', title)
        data.append('description',description)
        data.append('musicType',musicType)
        data.append('type',type)
        data.append('maxAllowed',JSON.stringify(maxAllowed))
        pictures.map((picture) => {
            data.append('eventimages', 
            {
                uri: picture,
                type: 'image/jpeg',
                name: "event.jpg"
            }
            )
        })
        
        data.append('placeType', placeType)
        data.append('price', JSON.stringify(price))
        data.append('smoke', JSON.stringify(smoke))
        data.append('additionalInfos',additionalInfos)
        data.append('manualValidation',manualValidation == "MANUELLE"?"true":"false")
        data.append('latitude',JSON.stringify(address.latitude))
        data.append('longitude',JSON.stringify(address.longitude))
        data.append('address',address.address)
        data.append('start',JSON.parse(JSON.stringify(startTime)))
        data.append('end',JSON.parse(JSON.stringify(endTime)))
        data.append('number',phone)
        setShowModal(false)
        navigate("recap", {data:Object.fromEntries(data['_parts']), formData: data})
    }

    return (
        <View style={styles.container}>
            <AlertError 
                message = {messageError}
                isVisible = {messageError?true: false}
                onClose = {() => setMessageError("")}
            />
            <Text style = {styles.title}>Créer un événement</Text>
            <ProgressSteps 
                activeStep = {activeStep} 
                {...progressStepsStyle}
                // marginBottom = {20}
            >
                <ProgressStep 
                    scrollable = {false}
                    removeBtnRow
                    label="Etape 1"
                >
                    <FirstStep
                        title = {title}
                        description = {description}
                        address = {address}
                        setTitle = {setTitle}
                        setDescription = {setDescription}
                        setAddress = {setAddress}
                        setActiveStep = {nextStep}
                    />
                </ProgressStep>
                <ProgressStep 
                    label="Etape 2"
                    scrollable = {false}
                    previousBtnText = "Précédent"
                    nextBtnText = "Suivant"
                    nextBtnStyle = {styles.nextBtnStyle}
                    nextBtnTextStyle = {styles.nextBtnTextStyle}
                    previousBtnTextStyle = {styles.previousBtnTextStyle}
                    onNext = {() => nextStep(2)}
                    onPrevious = {onPrevious}
                >
                    <SecondStep
                        setMusicType = {setMusicType}
                        setType = {setType}
                        setPlaceType = {setPlaceType}
                        setActiveStep = {nextStep}
                        type = {type}
                        musicType = {musicType}
                        placeType = {placeType}
                    />
                </ProgressStep>
                <ProgressStep 
                    label="Etape 3"
                    scrollable = {false} 
                    previousBtnText = "Précédent"
                    nextBtnText = "Suivant"
                    nextBtnStyle = {styles.nextBtnStyle}
                    nextBtnTextStyle = {styles.nextBtnTextStyle}
                    previousBtnTextStyle = {styles.previousBtnTextStyle}
                    onNext = {() => nextStep(3)}
                    onPrevious = {onPrevious}
                >
                    <ThirdStep
                        setMaxAllowed = {setMaxAllowed}
                        setPictures = {setPictures}
                        setSmoke = {setSmoke}
                        setPrice = {setPrice}
                        setActiveStep = {nextStep}
                        maxAllowed = {maxAllowed}
                        price = {price}
                        pictures = {pictures}
                        smoke = {smoke} 
                    />
                </ProgressStep>
                <ProgressStep 
                    label="Etape 4"
                    scrollable = {false} 
                    previousBtnText = "Précédent"
                    finishBtnText = "Valider"
                    nextBtnStyle = {styles.nextBtnStyle}
                    nextBtnTextStyle = {styles.nextBtnTextStyle}
                    previousBtnTextStyle = {styles.previousBtnTextStyle}
                    onNext = {() => nextStep(4)}
                    onPrevious = {onPrevious}
                >
                    <FourthStep
                        setManualValidation = {setManualValidation}
                        setPhone = {setPhone}
                        setShowModal = {setShowModal}
                        setStartTime = {setStartTime}
                        setEndTime = {setEndTime}
                        setAdditionalInfos = {setAdditionalInfos}
                        additionalInfos = {additionalInfos}
                        manualValidation = {manualValidation}
                        phone = {phone}
                        startTime = {startTime}
                        showModal = {showModal}
                        showRecap = {showRecap}
                    />
                </ProgressStep>
            </ProgressSteps>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        backgroundColor: '#fff'
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        marginLeft: 20
    },
    nextBtnStyle: {
        backgroundColor: colors.PRIMARY,
        borderRadius: 25,
        paddingHorizontal: 40,
        borderWidth: 1,
        marginRight: -40
    },
    nextBtnTextStyle: {
        color: colors.WHITE
    },
    previousBtnTextStyle: {
        color: colors.PRIMARY
    }
});

//make this component available to the app
export default CreatEventScreen;
