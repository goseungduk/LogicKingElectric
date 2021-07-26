import Head from "next/head";
import MenuBar from "@/components/menuBar";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Logo from "@/components/logo";
import IncenErrorShow from "@/components/incenErrorShow";
import EnvTab from "@/components/envTab";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const homeStyles = makeStyles((theme: Theme) =>
    createStyles({
        home: {
            display: "flex",
            flexDirection: "row",
            marginTop: 48,
        },
    }),
);
export default function Home(): JSX.Element {
    const homeStyle = homeStyles();
    return (
        <div>
            <Head>
                <title>논리왕전기에너지:신재생에너지 발전량 예측시스템</title>
                <meta name="description" content="" />
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <AppBar position="static" style={{ background: "#ffffff" }}>
                <Toolbar>
                    <Logo width={"50%"} height={"50%"}></Logo>
                    <MenuBar />
                </Toolbar>
            </AppBar>
            <div className={homeStyle.home}>
                <div>
                    <IncenErrorShow type="error"></IncenErrorShow>
                </div>
                <EnvTab></EnvTab>
            </div>
        </div>
    );
}
