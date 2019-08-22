import React, {Component} from 'react';
import { StyleSheet,Text,TextInput, View,Image ,Alert,FlatList,Dimensions ,TouchableOpacity,ActivityIndicator,SafeAreaView} from 'react-native';
const window = Dimensions.get('window');
import Button from 'react-native-button';
import { TextField } from 'react-native-material-textfield';
type Props = {};
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import stringsoflanguages from './Local';
import axios from 'react-native-axios';
import {Dropdown} from "react-native-material-dropdown";
const GLOBAL = require('./Global');
export default class Register extends Component {
    state = {
       name :'',
        email:'',
        phone :'',
        company :'',
        data:[],
        roleid:'',
        is:false,
        contract:'',

    };

    static navigationOptions = ({ navigation }) => {
        return {
            header: () => null,
            animations: {
                setRoot: {
                    waitForRender: false
                }
            }
        }
    }

    hideLoading() {
        this.setState({loading: false})
    }
    getSelection = (index) => {



        for(let i = 0; i < 2; i++){

            this.state.moviesList[i].selected = "";

        }

        this.setState({moviesList:this.state.moviesList})

        let indexs = this.state.moviesList;
        let targetPost = this.state.moviesList[index];
        if (targetPost.selected == ''){
            targetPost.selected = 'Y'
        }else{
            targetPost.selected = ''
        }
        indexs[index] = targetPost
        this.setState({moviesList:indexs})


    }
    _renderItems = ({item,index}) => {

        return (

            <TouchableOpacity onPress={() => this.getSelection(index)
            }>
                <View style={{flexDirection :'row', flex: 1 ,marginLeft: '5%',marginTop:12,width : '90%', backgroundColor: 'white',height:38,borderBottomColor:'#77869E',borderBottomWidth:1
                    ,justifyContent:'space-between'}}>

                    <Text style={{marginLeft : 5,marginTop:10,fontSize : 20,color :'#77869E', height:'auto',fontFamily:'AvenirLTStd-Medium'}}>

                        {item.title}
                    </Text>
                    {item.selected != '' &&(

                        <Image style = {{width :30 ,height :30,alignSelf:'flex-end',marginRight:4,marginBottom: 6}}
                               source={require('./check.png')}/>
                    )}
                </View>
            </TouchableOpacity>
        )
    }

    showLoading() {
        this.setState({loading: true})
    }
    myCallbackFunctions = (res) => {
           GLOBAL.mobile =  this.state.phone
        this.hideLoading()
        if (res.status == 200){
            GLOBAL.which = "3"
            this.props.navigation.navigate('Otp')
        } else if (res.status == 201){
            alert('Mobile number already exist')
        }else if (res.status == 202){
            alert('Service Contract number is wrong.')
        }
        else{
            alert(stringsoflanguages.unable)
        }

    }
    myCallbackFunction = (res) => {
        this.hideLoading()
        this.setState({data:res.role})
        this.setState({loading: false})
    }
    setTimePassed = () => {
        if (this.state.roleid == 6 ||this.state.roleid == 7  ){
            this.setState({is : false})

        }else{
            this.setState({is : true})
        }

    }
    getIndex = (index) => {
       //

        this.setState({roleid:this.state.data[index].id})
        this.timeoutCheck = setTimeout(() => {
            this.setTimePassed();
        }, 400);
    }
    _handlePressLogin() {
        this.showLoading()
        var self=this;
        var url = GLOBAL.BASE_URL + 'getrole';
        axios.get(url)
            .then(function (response) {
                self.myCallbackFunction(response.data)
            })
            .catch(function (error) {
                console.log(error);

            });

    }
    componentDidMount(){
        this._handlePressLogin()
    }
    _handlePress() {
        console.log('Pressed!');
        alert(this.state.phone)

        if (this.state.name == ""){
            alert(stringsoflanguages.name + stringsoflanguages.please)
        }else if (this.state.email == ""){
            alert(stringsoflanguages.emailid + stringsoflanguages.please)
        }

        else if (this.state.phone == ""){
            alert(stringsoflanguages.mobile + stringsoflanguages.please)
        }else if (this.state.company == ""){
            alert(stringsoflanguages.compnayname + stringsoflanguages.please)
        }else{
            this.showLoading()
            var self=this;

            var url = GLOBAL.BASE_URL + 'company_register';


            alert(url)

            axios.post(url, {
                name: this.state.name,
                mobile: this.state.phone,
                email: this.state.email,
                company_name: this.state.company,
                role_id:this.state.roleid,
                service_contract_number:this.state.contract

            })
                .then(function (response) {


                    self.myCallbackFunctions(response.data)


                    //    self.myCallbackFunction.bind()

                    //   this.myCallbackFunction()


                })
                .catch(function (error) {
                    alert(error)
                    //  self.myCallbackFunction()

                });

        }

        // this.props.navigation.navigate('Otp')
    }

    check = () => {
        this.setState({isSecure :!this.state.isSecure})
    }
    render() {
        let { phone } = this.state;
        let { email } = this.state;
        let { name } = this.state;
        let { company } = this.state;
        let { contract } = this.state;
        if(this.state.loading){
            return(
                <View style={styles.container}>
                    <ActivityIndicator style = {styles.loading}

                                       size="large" color='#006FA5' />
                </View>
            )
        }
        return (
            <SafeAreaView>
                <View style={styles.container}>
                <KeyboardAwareScrollView>

                    <Image style = {{width :200 ,height: 140,alignSelf:'center',marginTop:'10%',resizeMode: 'contain'}}
                           source={require('./logo-login.png')}/>


                           <View style = {{marginLeft:'5%',width:'90%',marginTop:'10%'}}>


                    <TextField
                        label={stringsoflanguages.name}
                        value={name}
                        onChangeText={ (name) => this.setState({ name }) }
                    />


                    <TextField
                        label={stringsoflanguages.emailid}
                        value={email}
                        onChangeText={ (email) => this.setState({ email }) }
                    />


                    <TextField
                        label={stringsoflanguages.mobile}
                        value={phone}
                        onChangeText={ (phone) => this.setState({ phone : phone}) }
                    />

                    <TextField
                        label={stringsoflanguages.compnayname}
                        value={company}
                        onChangeText={ (company) => this.setState({ company }) }
                    />


                    <View style = {{marginTop:20}}>
                               <Dropdown containerStyle={{width:'100%', height:50, marginTop:-10}}
                                         fontSize={14}
                                         labelFontSize={13}
                                         dropdownPosition = {-4.2}
                                         onChangeText ={ (value,index) => this.getIndex(index) }

                                         label={stringsoflanguages.select}
                                         data={this.state.data
                                         }
                               />

                        { this.state.is == true && (
                        <View style = {{marginTop:20}}>

                        <TextField
                            label={stringsoflanguages.service}
                            value={contract}
                            onChangeText={ (contract) => this.setState({ contract }) }
                        />
                        </View>
                        )}
                    </View>

                           </View>









                        <Button
                            style={{padding:10,marginTop:14,fontSize: 20, color: 'white',backgroundColor:'#006FA5',marginLeft:'5%',width:'90%',height:40,fontFamily:'AvenirLTStd-Heavy',borderRadius:4}}
                            styleDisabled={{color: 'red'}}
                            onPress={() => this._handlePress()}>
                            {stringsoflanguages.register}
                        </Button>

                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')
                    }>
                    <Text style={{textAlign:'center',width:'100%',color :'#006FA5',fontFamily:'AvenirLTStd-Heavy',fontSize: 15,marginTop:40}} >
                        <Text style={{color :'#77869E',textAlign:'center',fontFamily:'AvenirLTStd-Heavy',fontSize: 15,marginTop:40}} >
                            {stringsoflanguages.already}
                        </Text>
                        &nbsp;{stringsoflanguages.sign}
                    </Text>
                    </TouchableOpacity>

                </KeyboardAwareScrollView>

                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
    },
    container: {

        backgroundColor :'white'
    },
    loading: {
        position: 'absolute',
        left: window.width/2 - 30,

        top: window.height/2,

        opacity: 0.5,

        justifyContent: 'center',
        alignItems: 'center'
    },
    slide1: {

        marginLeft : 50,

        width: window.width - 50,
        height:300,
        resizeMode:'contain',
        marginTop : window.height/2 - 200


    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9',
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    }
})