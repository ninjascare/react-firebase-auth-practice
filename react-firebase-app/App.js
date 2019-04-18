import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TextInput
} from "react-native";
import { f, database, auth } from "./config/config";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false
    };
    // this.registerUser("testemail@gmail.com", "fakepassword");
    var that = this;

    f.auth().onAuthStateChanged(function(user) {
      if (user) {
        // logged in
        that.setState({
          loggedIn: true
        });
        console.log(user, "logged in");
      } else {
        // logged out
        that.setState({
          loggedIn: false
        });
        console.log("logged out");
      }
    });
  }

  loginUser = async (email, pass) => {
    if (email != "" && pass != "") {
      try {
        let user = await auth.signInWithEmailAndPassword(email, pass);
        console.log(user);
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Missing Email or Password");
    }
  };

  async loginWithFacebook() {
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
      "1926139250823845",
      { permissions: ["email", "public_profile"] }
    );
    if (type === "success") {
      const credentials = f.auth.FacebookAuthProvider.credential(token);
      f.auth()
        .signInWithCredential(credentials)
        .catch(error => {
          console.log("Error..", error);
        });
    }
  }

  registerUser = (email, password) => {
    console.log(email, password);
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(user => console.log(email, password, user))
      .catch(err => console.log("error logging in", err));
  };

  signUserOut = () => {
    auth
      .signOut()
      .then(() => {
        console.log("logged out...");
      })
      .catch(err => console.log("Error:", err));
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>-----</Text>

        {this.state.loggedIn == true ? (
          <View>
            <TouchableHighlight
              style={{ backgroundColor: "red" }}
              onPress={() => this.signUserOut()}
            >
              <Text style={{ color: "white" }}>Log-Out</Text>
            </TouchableHighlight>
            <Text>Logged in...</Text>
          </View>
        ) : (
          <View>
            {this.state.emailLoginView == true ? (
              <View>
                <Text> Email: </Text>
                <TextInput
                  onChangeText={text =>
                    this.setState({
                      email: text
                    })
                  }
                  value={this.state.email}
                />

                <Text> Password: </Text>
                <TextInput
                  onChangeText={text =>
                    this.setState({
                      pass: text
                    })
                  }
                  secureTextEntry={true}
                  value={this.state.pass}
                />

                <TouchableHighlight
                  onPress={() =>
                    this.loginUser(this.state.email, this.state.pass)
                  }
                  style={{ backgroundColor: "orange" }}
                >
                  <Text style={{ color: "white" }}>Login</Text>
                </TouchableHighlight>
              </View>
            ) : (
              <View />
            )}

            <TouchableHighlight
              onPress={() =>
                this.setState({
                  emailLoginView: true
                })
              }
              style={{ backgroundColor: "green" }}
            >
              <Text style={{ color: "white" }}>Login With Email</Text>
            </TouchableHighlight>

            <TouchableHighlight
              onPress={() => this.loginWithFacebook()}
              style={{ backgroundColor: "green" }}
            >
              <Text style={{ color: "white" }}>Login With Facebook</Text>
            </TouchableHighlight>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
