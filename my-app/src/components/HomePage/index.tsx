import React, { useState, useMemo, useEffect } from "react";
import "./index.css";
import PartnersApi from "../../api/partners";
import { Partner } from "../../interfaces/partner";
import mainLogo from "../../public/main-logo.png";
import PartnerCard from "../PartnerCard";
import { Container, Grid, TextField, Slider, typographyClasses, CardMedia, Typography, Box, CircularProgress } from '@mui/material';


const Homepage: React.FC = () => {
    const maxRange = 20000;
    const [partners, setPartners] = useState<Partner[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [range, setRange] = useState<number>(maxRange);
    const [rangeVal, setRangeVal] = useState<number>(maxRange);
    const [loading, setLoading] = useState<boolean>(false);
    const marks = [
        {
            value: 0,
            label: '0 Km',
        },
        {
            value: maxRange,
            label: maxRange + " Km",
        },
    ];


    const getPartners = () => {
        setLoading(true);
        console.log("searchTerm",searchTerm);
        PartnersApi.search(searchTerm, range).then((response) => {
            setPartners(response.data);
            setLoading(false);
        });
    }

    const searchByTerm = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        // getPartners();
    }

    const changeRange = (e: Event, newValue: number | number[], activeThumb: number) => {
        setRange(newValue as number);
    }

    const searchByRange = (e: React.SyntheticEvent | Event, newValue: number | number[]) => {
        setRangeVal(newValue as number);
        // getPartners();
    }

    useEffect(() => {
        getPartners();
    }, [searchTerm, rangeVal]);

    return (

        <Container maxWidth="xl">
            <img src={mainLogo} />
            <Typography className={typographyClasses.paragraph}>The Washmen invitation system</Typography>
            <br />
            <Grid container direction="row" spacing={3}>
                <Grid item md={3} sm={3} xs={12}>
                    <TextField id="outlined-basic" label="Organization Name" variant="outlined" value={searchTerm} onChange={searchByTerm} />
                </Grid>
                <Grid item md={3} sm={3} xs={12}>
                    <Typography>Distance</Typography>
                    <Slider aria-label="Range" value={range}
                        valueLabelDisplay="auto" min={0}
                        marks={marks}
                        max={maxRange} step={500} onChangeCommitted={searchByRange} onChange={changeRange} />
                </Grid>
            </Grid>
            {
                loading ?
                    <CircularProgress />
                    : null
            }


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