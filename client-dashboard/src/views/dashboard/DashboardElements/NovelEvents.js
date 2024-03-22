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
import { IconCalendarDue } from '@tabler/icons';

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

export default function NovelEvents({image, name, date}) {
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
        <Box mt={2}>
            <Box>
                {isLoading ? (
                    <>
                        <Skeleton
                            variant="square"
                            animation="wave"
                            borderRadius="1rem"
                            minWidth='auto'
                            height={220}
                            sx={{ borderRadius: (theme) => theme.shape.borderRadius / 5 }}
                        ></Skeleton>
                    </>
                ) : (
                    <CoverImgBg>
                        <CoverImgStyle>
                            <Box
                                height={'100%'}
                                display={'flex'}
                                justifyContent="flex-end"
                                flexDirection="column"
                            >
                                <Box sx={{ backgroundColor: (theme) => alpha(theme.palette.grey[900], 0.6), padding:'0.8rem'}}>
                                    <Box>
                                        <Typography
                                            gutterBottom
                                            variant="h6"
                                            color="inherit"
                                            sx={{ textDecoration: 'none' }}
                                        >
                                            {name}
                                        </Typography>
                                    </Box>
                                    <Stack direction="row" gap={3} alignItems="center">
                                        <Stack direction="row" gap={1} alignItems="center">
                                            <IconCalendarDue size="18" /> {date}
                                        </Stack>
                                    </Stack>
                                </Box>
                            </Box>
                        </CoverImgStyle>
                    </CoverImgBg>
                )}
            </Box>
        </Box>
    )
}
