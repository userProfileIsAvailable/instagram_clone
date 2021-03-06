import React from 'react';
import { Typography, Button, Box, IconButton, Avatar } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import VerifiedRoundedIcon from '@material-ui/icons/VerifiedRounded';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
const useStyles = makeStyles((theme) => ({
	root: ({ index }) => ({
		transform: `translateX(${index * -560}px)`,
		transition: `${theme.transitions.create(['transform'])}`
	}),
	matches_600: ({ index }) => ({
		transform: `translateX(${index * -185}px)`,
		transition: `${theme.transitions.create(['transform'])}`
	})
}));
const SuggestionCard = (props) => {
	const theme = useTheme();
	const matches_600 = useMediaQuery(theme.breakpoints.down('sm'));

	const classes = useStyles(props);
	return (
		<Box
			className={clsx({ [classes.matches_600]: matches_600, [classes.root]: !matches_600 })}
			sx={{
				width: 200,
				height: 208,
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center'
			}}>
			<Box
				sx={{
					width: 176,
					height: 207,
					display: 'flex',
					alignItems: 'stretch',
					flexDirection: 'column',
					flexShrink: 0,
					position: 'relative',
					border: '1px solid  #e0e0e0',
					borderRadius: '4px'
				}}>
				{/*Info box */}
				<Box
					sx={{
						p: '20px 20px',
						height: '100%',
						position: 'relative',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center'
					}}>
					<IconButton
						sx={{
							position: 'absolute',
							top: 0,
							right: 0,
							fontSize: '12px',
							'& .MuiSvgIcon-root': { width: '14px', height: '14px' }
						}}>
						<CloseIcon />
					</IconButton>
					{/*User photo go here */}
					<Box sx={{ mb: '20px', cursor: 'pointer' }}>
						<Avatar src='/images/avatars/Hugh.jpg' alt='Hugh jackman' sx={{ width: 54, height: 54 }}></Avatar>
					</Box>
					{/* User name go here */}
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'row',
							alignItems: 'center',
							cursor: 'pointer',
							mb: '4px',
							flexGrow: 0,
							flexShrink: 0,
							flexBasis: 'auto'
						}}>
						<Typography variant='body2' sx={{ fontWeight: 575 }}>
							Hugh Jackman
						</Typography>
						<VerifiedRoundedIcon sx={{ width: 18, height: 18, ml: '4px', color: 'info.main' }}></VerifiedRoundedIcon>
					</Box>
					{/*Popularity */}
					<Box sx={{ width: '100%', textAlign: 'center', color: 'GrayText', mb: '20px' }}>
						<Typography sx={{ fontSize: '12px' }}>Popular</Typography>
					</Box>
					{/*follow button */}
					<Button
						sx={{
							width: '100%',
							bgcolor: 'info.main',
							color: 'white',
							textTransform: 'capitalize',
							fontWeight: 570,
							'&:hover, &:active': {
								bgcolor: 'info.dark'
							}
						}}>
						Follow
					</Button>
				</Box>
			</Box>
		</Box>
	);
};

export default SuggestionCard;
