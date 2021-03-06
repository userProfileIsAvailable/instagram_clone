import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Picker from 'emoji-picker-react';
import { Grid, IconButton, InputBase, Box, Button, Avatar, Typography } from '@material-ui/core';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import { useFirestoreConnect, isEmpty, useFirestore, isLoaded } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
const validationSchema = yup.object({
	message: yup.string('Enter your email').min(1).max(140).required('please enter some text')
});
const ChatRoom = ({ item }) => {
	const { userId, username } = useSelector((state) => state.firebase.profile);
	const { chatRoom } = useSelector((state) => state.firestore.data);
	const { username: name, userId: id } = item;
	const firestore = useFirestore();
	useFirestoreConnect({
		collection: 'chatRoom',
		where: ['members', '==', [`${userId}`, `${id}`]],
		storeAs: 'chatRoom'
	});
	const isChatRoomLoaded = isLoaded(chatRoom);
	const isChatRoomEmpty = isEmpty(chatRoom);
	useEffect(() => {
		// if chatRoom data have not loaded ,do nothing;
		if (!isChatRoomLoaded) {
			return;
		}
		// if data loaded, check if chatRoom have created or not, if empty, create one
		if (isChatRoomEmpty) {
			return firestore.collection('chatRoom').add({ members: [userId, id], nameList: [username, name] });
		}
	}, [id, name, userId, username, isChatRoomLoaded, isChatRoomEmpty]);

	const [chosenEmoji, setChosenEmoji] = useState(null);
	const [showEmoji, setShowEmoji] = useState(false);
	const toggleEmoji = () => {
		setShowEmoji((showEmoji) => !showEmoji);
	};

	const formik = useFormik({
		initialValues: {
			message: ''
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			console.log(1);
		}
	});
	const onEmojiClick = (event, emojiObject) => {
		setChosenEmoji(emojiObject);

		formik.values.message += `${emojiObject.emoji}`;
	};

	return (
		<Grid
			container
			sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
			{/*Header */}
			<Grid
				item
				sx={{
					height: '60px',
					width: '100%',
					display: { md: 'flex', sm: 'flex', xs: 'none' },
					flexDirection: 'row',
					alignItems: 'center',
					justifyContent: 'space-between',
					borderBottom: 1,
					borderColor: '#e3e3e3'
				}}>
				{/*Message receiver info box */}
				<Box sx={{ display: 'flex', alignItems: 'center', pl: '1rem', height: 40, alignSelf: 'center' }}>
					<Avatar
						src='/images/avatars/default.png'
						alt='avatar'
						sx={{ width: 24, height: 24, mr: '10px', cursor: 'pointer' }}
					/>
					<Typography variant='subtitle1' sx={{ cursor: 'pointer' }}>
						{name}
					</Typography>
				</Box>
				<IconButton sx={{ height: '48px' }}>
					<MoreHorizIcon />
				</IconButton>
			</Grid>
			<Grid item sx={{ width: '100%', flexGrow: 0, height: `calc(100% - 126px)` }}>
				{/*message area */}
				<SimpleBar forceVisible='y' autoHide={false} style={{ height: '100%', maxHeight: '588px' }}></SimpleBar>
			</Grid>
			<Grid
				item
				component='form'
				onSubmit={formik.handleSubmit}
				sx={{
					height: '50px',
					width: '90%',
					display: 'flex',
					flexDirection: 'row',
					alignItems: 'center',
					mb: '1rem',
					mx: '0.5rem',
					position: 'relative',
					border: 1,
					borderColor: '#e3e3e3',
					borderRadius: '30px'
				}}>
				{/*input area */}
				<IconButton onClick={toggleEmoji}>
					<InsertEmoticonIcon />
				</IconButton>
				<Picker
					pickerStyle={{
						position: 'absolute',
						left: '-27px',
						bottom: '50px',
						display: `${showEmoji === false ? 'none' : 'flex'} `
					}}
					onEmojiClick={onEmojiClick}
				/>
				<InputBase
					multiline
					id='message'
					name='message'
					type='text'
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.message}
					maxRows={3}
					sx={{ pl: '6px', flexGrow: 1 }}
					placeholder='Message...'></InputBase>
				<Box sx={{ display: 'flex' }}>
					<Button
						disabled={!formik.dirty && !formik.values.message}
						type='submit'
						sx={{
							mr: '5px',
							color: 'info.main',
							textTransform: 'capitalize',
							'&.Mui-disabled': { color: 'info.main', opacity: 0.5 }
						}}>
						Send
					</Button>
				</Box>
			</Grid>
		</Grid>
	);
};

export default ChatRoom;
