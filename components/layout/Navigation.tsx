import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "next/link";

const Navigation = () => {
    const menuItems: {
        path: string;
        text: string;
    }[] = [
        {text: "Challenges", path: "/challenges"},
        {text: "Assessments", path: "/assessments"},
    ];

    return (
        <header>
            <div style={{display: "flex", alignItems: "center"}}>
                <span style={{fontSize: "56px", paddingLeft: "20px"}}>
                    <span style={{fontWeight: "bold", color: "#8ef5f3"}}>PRO</span>
                    <span style={{fontWeight: "bold", color: "purple"}}>REC</span>
                </span>
                <span style={{alignItems: "start", marginLeft: "30px", display: "flex"}}>
                    <Breadcrumbs>
                        {menuItems.map(
                            menuItem => <Link key={menuItem.path} href={menuItem.path} style={{fontSize: "30px"}}>
                                {menuItem.text}
                            </Link>)}
                    </Breadcrumbs>
                </span>
            </div>
        </header>
    );
};

export default Navigation;
