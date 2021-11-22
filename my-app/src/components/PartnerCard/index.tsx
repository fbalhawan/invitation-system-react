import React, { useState, useMemo, useEffect } from "react";
import defaultCompanyLogo from "../../public/logo192.png";
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import BusinessIcon from '@mui/icons-material/Business';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Card, CardContent, CardHeader, Container, Grid, TextField, Slider, createTheme, ThemeProvider, typographyClasses, CardMedia, IconButton, Tooltip, styled, IconButtonProps, CardActions, Collapse } from '@mui/material';
import { Partner } from "../../interfaces/partner";

type CardProps = {
    partner: Partner
}
interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}
const PartnerCard: React.FC<CardProps> = ({ partner }) => {

    const ExpandMore = styled((props: ExpandMoreProps) => {
        const { expand, ...other } = props;
        return <IconButton {...other} />;
    })(({ theme, expand }) => ({
        transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    }));

    const [expanded, setExpanded] = React.useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card style={{ cursor: "pointer" }}>
            <CardHeader
                title={String(partner.organization)}
                subheader={partner.website}
                action={
                    partner.willWorkRemotely ?
                        <Tooltip title="Works Remotely">
                            <IconButton aria-label="settings">
                                <HomeWorkIcon />
                            </IconButton>
                        </Tooltip>
                        :
                        <Tooltip title="Works on premise">
                            <IconButton aria-label="settings">
                                <BusinessIcon />
                            </IconButton>
                        </Tooltip>
                }
            />
            <CardMedia
                component="img"
                height="194"
                image={defaultCompanyLogo}
                alt="Company Logo"
            />
            <CardContent>
                <p>{
                    partner.customerLocations
                }</p>
            </CardContent>

            <CardActions disableSpacing>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>

            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                        {
                            partner.offices?.map((office, i) => (
                                <>
                                    <p>Office {i + 1 + ": " + office.distanceFromSource + "Km"}</p>
                                    <p>{office.location}</p>
                                    <p>{office.address}</p>
                                    <br />
                                </>
                            ))
                        }
                    <p>{partner.services}</p>
                </CardContent>
            </Collapse>
        </Card>
    );
}
export default PartnerCard;