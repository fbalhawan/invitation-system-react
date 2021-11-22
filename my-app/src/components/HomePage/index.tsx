import React, { useState, useMemo, useEffect } from "react";
import "./index.css";
import PartnersApi from "../../api/partners";
import { Partner } from "../../interfaces/partner";
import mainLogo from "../../public/main-logo.png";
import PartnerCard from "../PartnerCard";
import { Card, CardContent, CardHeader, Container, Grid, TextField, Slider, typographyClasses, CardMedia } from '@mui/material';


const Homepage: React.FC = () => {
    const maxRange = 20000;
    const [partners, setPartners] = useState<Partner[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [range, setRange] = useState<number>(maxRange);



    const getPartners = () => {
        PartnersApi.search(searchTerm, range).then((response) => {
            console.log("Response", response);
            setPartners(response.data);
            console.log("partners", partners);

        });
    }

    const searchByTerm = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        getPartners();
    }

    const changeRange = (e: Event, newValue: number | number[], activeThumb: number) => {
        setRange(newValue as number);
    }

    const searchByRange = (e: React.SyntheticEvent | Event, newValue: number | number[]) => {


        getPartners();
    }

    useEffect(() => {
        getPartners();
    }, []);

    return (

        <Container maxWidth="xl">
            <img src={mainLogo} />
            <p className={typographyClasses.paragraph} style={{ color: "white" }}>The Washmen invitation system</p>
            <br/>
            <Grid container direction="row" spacing={3}>
                <Grid item md={3} sm={3} xs={12}>
                    <TextField id="outlined-basic" label="Organization Name" variant="outlined" value={searchTerm} onChange={searchByTerm} />
                </Grid>
                <Grid item md={3} sm={3} xs={12}>
                    <Slider aria-label="Range" value={range}
                        valueLabelDisplay="auto" min={0}

                        max={maxRange} step={500} onChangeCommitted={searchByRange} onChange={changeRange} />
                </Grid>
            </Grid>


            <Grid container
                spacing={3} style={{ marginTop: 10 }}
                direction="row"
                justifyContent="center"
                alignItems="center"
            >
                {
                    partners && partners.length > 0 ?

                        partners.map((item, i) => (
                            <Grid className="card" item md={3} sm={6} xs={12}>
                                <PartnerCard
                                    key={i}
                                    partner={item}
                                />
                            </Grid>
                        ))
                        : null
                }
            </Grid>

        </Container>
    );
}

export default Homepage;