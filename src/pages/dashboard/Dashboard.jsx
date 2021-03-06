import { Container, Grid } from '@material-ui/core';
import lodash from 'lodash';
import React, { useEffect } from 'react';
import InstagramAppBar from '../../components/appBar/SearchAppBar';
import CreatePost from '../../components/Content/CreatePost';
import Suggestion from '../../components/Content/Suggestion';
import PostCard from '../../components/PostCard/PostCard';
import AccountBar from '../../components/SideBar/AccountBar';
import SideSuggestion from '../../components/SideBar/SideSuggestion';
import { useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';
const Dashboard = () => {
	// sync /photos from firestore into redux
	useFirestoreConnect(['photos']);
	const photos = useSelector((state) => state.firestore.data.photos);

	useEffect(() => {
		document.title = 'instagram';
	}, []);
	return (
		<React.Fragment>
			<InstagramAppBar />
			<Container fluid='true' sx={{ height: '100vh', mt: '2rem' }} maxWidth='md' component='main'>
				<Grid container justifyContent='center' sx={{ height: '100%' }} component='section'>
					<Grid item sm={12} md={8} xs={12} sx={{ sm: { pr: '20px' } }}>
						{/* Content go here */}
						<CreatePost />
						<Suggestion />
						{/*Post card go here */}
						<Grid container sx={{ height: 'auto', mt: '1.5rem', flexDirection: 'column' }}>
							{/* <PostCard /> */}
							{lodash.map(photos, (info, key) => {
								return <PostCard key={key} info={info} />;
							})}
						</Grid>
					</Grid>
					{/* Sidebar only visible when screen sizes are greater than 960 */}
					<Grid item md={4} sx={{ display: { xs: 'none', sm: 'none', md: 'block', lg: 'block' } }}>
						{/* Sidebar go here */}
						<AccountBar />
						<SideSuggestion />
					</Grid>
				</Grid>
			</Container>
		</React.Fragment>
	);
};

export default Dashboard;
