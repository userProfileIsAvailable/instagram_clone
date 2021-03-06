import { Box, Skeleton } from '@material-ui/core';
import React from 'react';
import ChatListTabs from './ChatListTabs';

export const ChatList = ({ activeStep, tabIndex, handleTabChange, chatlist }) => {
	const switchBetweenSteps = () => {
		switch (activeStep) {
			case 0:
				return (
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'row',
							alignItems: 'center',
							justifyContent: 'flex-start',
							width: '100%',
							py: '8px',
							px: '16px'
						}}>
						<Skeleton variant='circular' width={56} height={56} />
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'flex-start',
								flexGrow: 1,
								height: '100%',
								ml: '10px'
							}}>
							<Skeleton variant='text' width={116} height={24} />
							<Skeleton variant='text' width={84} height={24} />
						</Box>
					</Box>
				);
			case 1:
				return (
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'row',
							alignItems: 'center',
							justifyContent: 'flex-start',
							width: '100%',
							py: '8px',
							px: '16px'
						}}>
						<Skeleton variant='circular' width={56} height={56} />
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'flex-start',
								flexGrow: 1,
								height: '100%',
								ml: '10px'
							}}>
							<Skeleton variant='text' width={116} height={24} />
							<Skeleton variant='text' width={84} height={24} />
						</Box>
					</Box>
				);
			case 2:
				return <ChatListTabs chatlist={chatlist} tabIndex={tabIndex} handleTabChange={handleTabChange} />;
			default:
				return;
		}
	};

	return <React.Fragment>{switchBetweenSteps()} </React.Fragment>;
};
