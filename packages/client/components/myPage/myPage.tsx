import { green } from "@material-ui/core/colors";
import Button from "@material-ui/core/Button";
import { useAuth } from "@/api/hooks";
import {
    FormFixedText,
    FormHeader,
    FormLocationPicker,
    FormNumberField,
    FormPasswordField,
    FormSelectable,
    FormTextField,
} from "./forms";
import styled from "styled-components";
import { Card, Snackbar, Typography } from "@material-ui/core";
import { PlantInfoModifier, SolarPlantInfoModifier, usePlantInfoModifier, useSolarPlantInfoModifier } from "./modifier";
import { useSubmitter } from "./submitter";
import { useState } from "react";
import Alert from "@material-ui/lab/Alert";
import { Switcher } from "./switcher";

export default function MyPage(): JSX.Element {
    const plantInfo = usePlantInfoModifier();
    const solarPlantInfo = useSolarPlantInfoModifier();

    const submitter = useSubmitter(plantInfo.data, solarPlantInfo.data);

    const [isError, setIsError] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    const [isSuccessSnackOpen, setIsSuccessSnackOpen] = useState(false);
    function closeSuccessSnack() {
        setIsSuccessSnackOpen(false);
    }

    const isValid = submitter.isValid;

    async function submit() {
        try {
            setIsProcessing(true);
            await submitter.submit();

            setIsSuccessSnackOpen(true);
        } catch {
            setIsError(true);
        } finally {
            setIsProcessing(false);
        }
    }

    return (
        <Centered>
            <MyPageBox>
                <Title />
                <InfoCard>
                    <BasicInfo />
                    <PlantInfo plant={plantInfo} />

                    <Switcher match={plantInfo.data.type}>
                        <SolarPlantInfo key="solar" solarPlant={solarPlantInfo} />
                        <WindPlantInfo key="wind" />
                        <HydroPlantInfo key="hydro" />
                    </Switcher>

                    <FieldError showError={isError} />
                </InfoCard>
                <Centered style={{ marginTop: "1em" }}>
                    <EditButton onClick={submit} disabled={!isValid || isProcessing}>
                        ??????
                    </EditButton>
                </Centered>
            </MyPageBox>
            <Snackbar open={isSuccessSnackOpen} autoHideDuration={6000} onClose={closeSuccessSnack}>
                <Alert onClose={closeSuccessSnack} severity="success">
                    ????????? ??????????????????!
                </Alert>
            </Snackbar>
        </Centered>
    );
}

function FieldError({ showError }: { showError: boolean }): JSX.Element {
    if (showError) {
        return <Typography color="error">?????? ????????? ??????????????????.</Typography>;
    } else {
        return <></>;
    }
}

const EditButton = styled(Button)`
    && {
        color: white;
        background-color: ${green[500]};

        :hover {
            background-color: ${green[700]};
        }
    }
`;

const Centered = styled.div`
    display: flex;
    justify-content: center;
`;

const MyPageBox = styled.div`
    width: 35em;
`;

const InfoCard = styled(Card)`
    && {
        padding: 1em 2em;
    }
`;

function Title() {
    return (
        <>
            <div style={{ fontFamily: "Jua", textAlign: "center", fontSize: 35, marginTop: "1em" }}>???????????????</div>
            <div style={{ fontFamily: "Jua", textAlign: "center", fontSize: 20, color: "gray" }}>
                ?????????, ???????????? ?????? ??????????????? ????????? ??? ????????????
            </div>
        </>
    );
}

function BasicInfo(): JSX.Element {
    const { username } = useAuth();
    return (
        <>
            <FormHeader>?????? ??????</FormHeader>
            <FormFixedText label="?????????">{username}</FormFixedText>
            <FormPasswordField label="????????????" />
            <FormPasswordField label="???????????? ??????" />
        </>
    );
}

interface PlantInfoProps {
    plant: PlantInfoModifier;
}

function PlantInfo(props: PlantInfoProps): JSX.Element {
    const { plant } = props;

    if (plant.isLoading) {
        return <div>??????</div>;
    }

    return (
        <>
            <FormHeader>????????? ??????</FormHeader>
            <FormTextField
                label="????????? ??????"
                value={plant.data.name}
                onChange={value => plant.modify("name", value)}
            />
            <FormLocationPicker
                label="????????? ??????"
                latitude={plant.data.latitude}
                longitude={plant.data.longitude}
                name={plant.data.locationName}
                onChange={(name, latitude, longitude) => {
                    plant.modify("locationName", name);
                    plant.modify("latitude", latitude);
                    plant.modify("longitude", longitude);
                }}
            />
            <FormSelectable
                label="?????? ??????"
                items={[
                    { key: "solar", label: "?????????" },
                    { key: "wind", label: "??????" },
                ]}
                value={plant.data.type}
                onChange={value => plant.modify("type", value)}
            />
        </>
    );
}

interface SolarPlantInfoProps {
    solarPlant: SolarPlantInfoModifier;
}

function SolarPlantInfo(props: SolarPlantInfoProps): JSX.Element {
    const { solarPlant } = props;
    return (
        <>
            <FormHeader>????????? ????????? ??????</FormHeader>
            <FormSelectable
                label="????????? ????????? ??????"
                items={[
                    { key: "fixed", label: "?????????" },
                    { key: "track", label: "?????????" },
                ]}
                value={solarPlant.data.arrayType}
                onChange={value => solarPlant.modify("arrayType", value)}
            />

            <FormNumberField
                label="?????? ?????? (kW)"
                value={solarPlant.data.capacity + ""}
                onChange={value => solarPlant.modify("capacity", value)}
            />
            <FormNumberField
                label="?????????"
                value={solarPlant.data.meridianAngle}
                onChange={value => solarPlant.modify("meridianAngle", value)}
            />
            <FormNumberField
                label="????????????"
                value={solarPlant.data.temperatureCoefficientPmpp}
                onChange={value => solarPlant.modify("temperatureCoefficientPmpp", value)}
            />
            <FormNumberField
                label="??????"
                value={solarPlant.data.tiltAngle}
                onChange={value => solarPlant.modify("tiltAngle", value)}
            />
        </>
    );
}

function WindPlantInfo(): JSX.Element {
    return (
        <>
            <FormHeader>?????? ????????? ??????</FormHeader>
        </>
    );
}

function HydroPlantInfo(): JSX.Element {
    return (
        <>
            <FormHeader>?????? ????????? ??????</FormHeader>
        </>
    );
}
