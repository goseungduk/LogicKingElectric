import React from "react";
import Head from "next/head";
import { Button, TextField } from "@material-ui/core";
import { makeStyles, Theme, createStyles, withStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import { useState, useEffect } from "react";
import Logo from "./logo";
import { useAPIRequest } from "@/api/hooks";
import { useAuthTokenSetter, useAuthToken } from "@/state/auth";
import { issueToken, register } from "@/api/endpoint";
import { useRouter } from "next/router";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "./alert";

const loginStyles = makeStyles((theme: Theme) =>
    createStyles({
        above_all: {
            alignItems: "stretch",
            display: "flex",
            flexDirection: "column",
            flexShrink: 0,
            position: "relative",
        },
        section_all: {
            minHeight: "100%",
            overflow: "hidden",
        },
        main: {
            minHeight: "100%",
            order: 4,
            flexGrow: 1,
            justifyContent: "center",
        },
        login_boxBK: {
            alignItems: "center",
        },
        login_box: {
            margin: "15% 20px 20% 20px",
            padding: 20,
            border: "1px solid #e6e6e6",
            borderRadius: 1,
            background: "#ffffff",
            maxWidth: 350,
            width: "100%",
        },
        logo_box: {
            display: "flex",
            alignItems: "center",
            marginBottom: "5%",
        },
        login_box_idpw: {
            //maxWidth: 334,
            display: "flex",
            alignItems: "center stretch",
            flexDirection: "column",
        },
        login_button: {
            marginTop: 10,
            background: "green",
            color: "white",
        },
        optional_box: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 10,
            fontWeight: "bold",
        },
    }),
);
const ColorButton = withStyles((theme: Theme) => ({
    root: {
        color: theme.palette.getContrastText(green[500]),
        backgroundColor: "#6fc83f",
        "&:hover": {
            backgroundColor: "#6fc83f",
        },
    },
}))(Button);

export default function Login(): JSX.Element {
    const router = useRouter();
    const loginStyle = loginStyles();
    const [open, setOpen] = useState(false);
    const [alert_open, setAlertOpen] = useState(false);
    const [alert_string, setAlertString] = useState("");
    const [alert_state, setAlertState] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [new_username, setNewUsername] = useState("");
    const [new_password, setNewPassword] = useState("");
    const [new_password_sub, setNewPasswordSub] = useState("");
    const authToken = useAuthToken();
    const setAuthToken = useAuthTokenSetter(); // sette
    const handleAlertClick = (notice: string, state: string) => {
        setAlertOpen(true);
        setAlertState(state);
        setAlertString(notice);
    };
    const handleAlertClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }
        setAlertOpen(false);
    };
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const confirm = (main_pass: string, sub_pass: string) => {
        if (main_pass != sub_pass) {
            handleAlertClick("??????????????? ????????????????????????.", "error");
        } else if (main_pass == "" || sub_pass == "") {
            handleAlertClick("????????? ??????????????? ??????????????????", "error");
        } else {
            requestRegister.request({ username: new_username, password: new_password });
            handleAlertClick("???????????? ??????!", "success");
            handleClose();
        }
    };
    const requestRegister = useAPIRequest(register.endpoint);

    const { request } = useAPIRequest(issueToken.endpoint, {
        onSuccess(res) {
            setAuthToken(res.accessToken);
            handleAlertClick("????????? ??????", "success");
            router.push("/", undefined, { shallow: true });
        },
        onError(err) {
            handleAlertClick("????????? ?????? ??????????????? ???????????????", "error");
        },
    });
    useEffect(() => {
        if (authToken != "") {
            router.push("/", undefined, { shallow: true });
        }
    }, [authToken]);
    function do_Login(username: string, password: string) {
        request({ username, password });
    }

    return (
        <div style={{ backgroundColor: "#fafafa" }}>
            <Head>
                <title>????????????????????????:?????????????????? ????????? ???????????????</title>
                <meta name="description" content="" />
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <section className={`${loginStyle.above_all} ${loginStyle.section_all}`}>
                <main className={`${loginStyle.above_all} ${loginStyle.main}`}>
                    <div className={`${loginStyle.above_all} ${loginStyle.login_boxBK}`}>
                        <div className={`${loginStyle.above_all} ${loginStyle.login_box}`}>
                            <div className={`${loginStyle.above_all} ${loginStyle.logo_box}`}>
                                <Logo width={"80%"} height={"80%"}></Logo>
                            </div>
                            <div className={loginStyle.login_box_idpw}>
                                <TextField
                                    label="username"
                                    value={username}
                                    onChange={e => setUsername(e.target.value)}></TextField>
                                <TextField
                                    type="password"
                                    label="password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}></TextField>
                            </div>
                            <div className={`${loginStyle.above_all} ${loginStyle.login_button}`}>
                                <ColorButton
                                    color="primary"
                                    onClick={() => {
                                        do_Login(username, password);
                                    }}>
                                    <span style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>?????????</span>
                                </ColorButton>
                            </div>
                            <div className={`${loginStyle.above_all} ${loginStyle.optional_box}`}>
                                <span onClick={handleClickOpen}>????????????</span>
                            </div>
                        </div>
                    </div>
                    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">????????????</DialogTitle>
                        <DialogContent>
                            <DialogContentText>????????? ??????????????? ???????????????</DialogContentText>
                            <TextField
                                autoFocus
                                margin="dense"
                                id={new_username}
                                label="?????????"
                                fullWidth
                                onChange={e => setNewUsername(e.target.value)}
                            />
                            <TextField
                                margin="dense"
                                id={new_password}
                                type="password"
                                label="????????????"
                                fullWidth
                                onChange={e => setNewPassword(e.target.value)}
                            />
                            <TextField
                                margin="dense"
                                id={new_password_sub}
                                type="password"
                                label="???????????? ?????????"
                                fullWidth
                                onChange={e => setNewPasswordSub(e.target.value)}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={() => confirm(new_password, new_password_sub)} color="primary">
                                Confirm
                            </Button>
                        </DialogActions>
                    </Dialog>
                </main>
            </section>
            <Snackbar open={alert_open} autoHideDuration={1000} onClose={handleAlertClose}>
                <Alert
                    handleAlertClose={handleAlertClose}
                    alert_string={alert_string}
                    alert_state={alert_state}></Alert>
            </Snackbar>
        </div>
    );
}
