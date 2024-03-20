import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    CardContent,
    Stack,
    Typography,
    Grid,
    Box,
    alpha,
    styled,
    Skeleton,
} from '@mui/material';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import BlankCard from '../../../components/shared/BlankCard';

const CoverImgStyle = styled(CardContent)({
    position: 'absolute',
    top: '0',
    left: '0',
    zIndex: 1,
    width: '100%',
    height: '100%',
    color: 'white',
});
const CoverBox = styled(Box)({
    top: 0,
    content: "''",
    width: '100%',
    height: '100%',
    position: 'absolute',
});

export default function ImagesSlider({image, name}) {
    const CoverImgBg = styled(BlankCard)({
        p: 0,
        height: '220px',
        minWidth: 'auto',
        position: 'relative',
        background: `url(${image}) no-repeat center`,
        backgroundSize: 'cover',
        borderRadius: "0.8rem"
    });

    const [isLoading, setLoading] = React.useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 700);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <Grid
                item
                xs={12}
                md={12}
                sm={12}
                display="flex"
                alignItems="center"
                mt={2}
            >
                {isLoading ? (
                    <>
                        <Skeleton
                            variant="square"
                            animation="wave"
                            borderRadius="1rem"
                            width={300}
                            height={240}
                            sx={{ borderRadius: (theme) => theme.shape.borderRadius / 5 }}
                        ></Skeleton>
                    </>
                ) : (
                    <CoverImgBg className="hoverCard">
                        <Typography>
                            <CoverBox
                                sx={{ backgroundColor: (theme) => alpha(theme.palette.grey[900], 0.6), height: '6rem', top: '140px' }}
                            />
                        </Typography>
                        <CoverImgStyle>
                            <Box
                                height={'100%'}
                                display={'flex'}
                                justifyContent="space-between"
                                flexDirection="column"
                            >
                                <Box>
                                </Box>
                                <Box>
                                    <Box>
                                        <Typography
                                            gutterBottom
                                            variant="h4"
                                            color="inherit"
                                            sx={{ textDecoration: 'none' }}
                                            component={Link}
                                        >
                                            {name}
                                        </Typography>
                                    </Box>
                                    <Stack direction="row" gap={3} alignItems="center">
                                        <Stack direction="row" gap={1} alignItems="center">
                                            <LocationOnOutlinedIcon size="18" /> {name}
                                        </Stack>
                                    </Stack>
                                </Box>
                            </Box>
                        </CoverImgStyle>
                    </CoverImgBg>
                )}
            </Grid>
        </>
    );
};
