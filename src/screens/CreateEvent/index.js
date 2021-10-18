//import liraries
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';

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
    const [manualValidation, setManualValidation] = useState(true)
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
                title == undefined || 
                description == undefined || 
                address.address == ''
            ) setMessageError("Veuillez remplir tous les champs")
            else{
                setMessageError("")
                setActiveStep(step)
            }
        }
        else if(step == 2){
            if(
                musicType == undefined || 
                placeType == undefined || 
                type == undefined
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
    }

    const showRecap = () => {
        const data = {
            title,
            description,
            musicType,
            type,
            maxAllowed,
            pictures,
            placeType,
            price,
            smoke,
            additionalInfos,
            manualValidation: manualValidation == "MANUELLE"?true:false,
            latitude: address.latitude,
            longitute: address.longitute,
            address: address.address,
            start: startTime,
            end: endTime,
            number: phone
        }
        setShowModal(false)
        navigate("recap", {data})
    }

    return (
        <View style={styles.container}>
            <AlertError 
                message = {messageError}
                isVisible = {messageError?true: false}
                onClose = {() => setMessageError("")}
            />
            <Text style = {styles.title}>Créer un événement</Text>
            <ProgressSteps activeStep = {activeStep} {...progressStepsStyle} >
                <ProgressStep 
                    scrollable = {false} 
                    removeBtnRow 
                    label="Etape 1"
                >
                    <FirstStep
                        setTitle = {setTitle}
                        setDescription = {setDescription}
                        setAddress = {setAddress}
                        setActiveStep = {nextStep}
                    />
                </ProgressStep>
                <ProgressStep 
                    label="Etape 2"
                    scrollable = {false} 
                    removeBtnRow 
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
                    removeBtnRow 
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
                    removeBtnRow 
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
    }
});

//make this component available to the app
export default CreatEventScreen;
