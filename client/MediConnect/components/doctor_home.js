//import { NavigationHelpersContext } from '@react-navigation/native';
import React from 'react';
import 'react-native-paper';
import {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import axios from 'axios';

class Home extends Component {
	state = {
		serverData: [],
	};

	componentDidMount = () => {
		axios
			.post('http://54.183.200.234:5000/patient/search', {
				symptoms: ['Chest pain'],
			})
			.then((res) => {
				console.log(res.data);
				this.setState({
					serverData: res.data,
				});
			})
			.catch((err) => console.log(err));
	};

	render() {
		return (
			<View testID="homepage" style={styles.container}>
				<View style={styles.infobox}>
					<View>
						<Text style={styles.text}>First Name : {global.first_name}</Text>
						<Text style={styles.text}>Last Name : {global.last_name}</Text>
						<Text style={styles.text}>Age : {global.age} years</Text>
						<Text style={styles.text}>Email : {global.email}</Text>
						<Text style={styles.text}>Rating : {global.rating}</Text>
						<Text style={styles.text}>Specialization : {global.specialization}</Text>
						<Text style={styles.text}>Verified : {global.verified}</Text>
						<Text style={styles.text}>Years of Experience : {global.years_of_experience}</Text>



					</View>
					{/* <TouchableOpacity style={styles.button} testID="report_symptoms_button">
						<Text
							style={styles.buttonText}
							onPress={() => this.props.navigation.navigate('Symptoms')}
						>
							Report Symptoms
						</Text>
					</TouchableOpacity> */}
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'white',
		fontFamily: 'Iowan Old Style',
		width: '100%',
		height: '100%',
	},

	user_icon: {
		borderRadius: 5,
		shadowColor: 'black',
		shadowOpacity: 1,
		shadowRadius: 2.45,
		padding: 20,
		width: 20,
		height: 20,
	},

	infobox: {
		alignSelf: 'center',
		backgroundColor: '#02f0c8',
		borderRadius: 10,
		shadowColor: 'black',
		shadowOpacity: 1,
		shadowRadius: 4.65,
		elevation: 8,
		width: 270,
		padding: 20,
	},

	button: {
		backgroundColor: 'white',
		padding: 10,
		margin: 15,
		height: 40,
		alignItems: 'center',
		justifyContent: 'center',
		shadowColor: 'black',
		borderRadius: 7,
	},

	buttonText: {
		fontFamily: 'Iowan Old Style',
		fontSize: 17,
		color: '#02d9b5',
	},

	text: {
		fontFamily: 'Iowan Old Style',
		color: '#5c5c5c',
		fontSize: 17,
	},

	doctor: {
		borderRadius: 7,
		backgroundColor: '#d9d9d9',
		height: 150,
		width: 270,
		margin: 20,
		shadowColor: 'black',
		shadowOpacity: 1,
		shadowRadius: 4.65,
		elevation: 8,
		padding: 20,
		alignSelf: 'center',
	},

	doctorinfo: {
		fontFamily: 'Iowan Old Style',
		color: 'black',
		fontSize: 12,
	},
});

export default Home;
