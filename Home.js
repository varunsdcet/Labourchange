import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Image,
    Alert,
    FlatList,
    Dimensions,
    TouchableOpacity,
    ActivityIndicator,
    SafeAreaView,
    AsyncStorage
} from 'react-native';
var status ;
const window = Dimensions.get('window');
import Button from 'react-native-button';
type Props = {};
import stringsoflanguages from './Local';
const GLOBAL = require('./Global');
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import axios from "react-native-axios";
export default class Home extends Component {
    state = {
        text: '',
        username: [],
        project: '',
        location :'',
        ipAdd : '',
        loading:'',
        visible:false,
        moviesList :[
            {
                title :stringsoflanguages.create,
                selected :'#E9ECF7',
                image:require('./create-request.png')
            },

            {
                title :stringsoflanguages.booking,
                selected :'#F8FBF5',
                image:require('./booking.png')
            },
            {
                title :stringsoflanguages.invoice,
                selected :'#FFFBF7',
                image:require('./invoice.png')
            },
            {
                title :stringsoflanguages.approval,
                selected :'#FEF8F4',
                image:require('./approval.png')
            },
            {
                title :stringsoflanguages.dlr,
                selected :'#F8F7FF',
                image:require('./dlr.png')
            },
            {
                title :stringsoflanguages.dpr,
                selected :'#FDEDF3',
                image:require('./dpr.png')
            },


        ],
        results: [],
        selected:[],

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

        if (status == "8" || status == "9"){
            if (index == 0) {
                this.props.navigation.navigate("DailyLabourReport")
            } else if (index == 1) {
                this.props.navigation.navigate("DailyProgressReport")
            }
        } else if (status == "10"){
            if (index == 0) {
                this.props.navigation.navigate("Invoice")
            } else if (index == 1) {
                this.props.navigation.navigate("Approvals")
            } else if (index == 2) {
                this.props.navigation.navigate("DailyLabourReport")
            } else if (index == 3) {
                this.props.navigation.navigate("DailyProgressReport")
            } else if (index == 4) {
                this.props.navigation.navigate("DailyLabourReport")
            } else if (index == 5) {
                this.props.navigation.navigate("DailyProgressReport")
            }
        }



        else {

            if (index == 0) {
                this.setState({visible: true})
            } else if (index == 1) {
                this.props.navigation.navigate("Booking")
            } else if (index == 2) {
                this.props.navigation.navigate("Invoice")
            } else if (index == 3) {
                this.props.navigation.navigate("Approvals")
            } else if (index == 4) {
                this.props.navigation.navigate("DailyLabourReport")
            } else if (index == 5) {
                this.props.navigation.navigate("DailyProgressReport")
            }
        }




    }
    _renderItem = ({item,index}) => {


        return (

            <TouchableOpacity onPress={() => this.getSelection(index)
            }>


                <View style = {{height :160 ,backgroundColor:"white",width:window.width/2 -20,marginLeft :13,borderRadius:12,marginTop:12,marginBottom:12}}>

                    <Image style = {{width :40 ,height: 40,marginLeft:20,marginTop:14,resizeMode: 'contain'}}
                           source={item.image}/>

                           <View style = {{margin:10,marginTop:42 ,backgroundColor:item.selected,borderRadius:12,height:48}}>

                               <Text style = {{color:'#042C5C',fontSize:14,margin:10,fontFamily:'AvenirLTStd-Medium'}}>
                                   {item.title}
                               </Text>
                               <Text style = {{color:'#77869E',fontSize: 12,marginLeft:10,marginTop:-6,fontFamily:'AvenirLTStd-Medium'}}>
                                   {stringsoflanguages.click}
                               </Text>

                           </View>
                </View>

            </TouchableOpacity>
        )
    }

    showLoading() {
        this.setState({loading: true})
    }
    myCallbackFunctions = (res) => {

        this.hideLoading()
        if (res.status == 200) {
            var responseArray = res["data"]
            if (responseArray.length != 0) {
                var responseDict = responseArray[0]
                GLOBAL.serviceContract = responseDict["service_contract_number"]

                this.setState({username: responseDict})
            }

        } else {
            alert(stringsoflanguages.unable)
        }
    }

        loadHome()
        {
            var self=this;
            var url = GLOBAL.BASE_URL + 'userdetails';
            axios.post(url, {
                user_id: GLOBAL.userID,

            })
                .then(function (response) {

                    self.myCallbackFunctions(response.data)

                })
                .catch(function (error) {
                    alert(error)
                    //  self.myCallbackFunction()

                });
        }


    getSelections = (type) =>{
        GLOBAL.type = type;
        this.setState({visible:false})
        this.props.navigation.navigate('CreateRequest')

    }
    componentDidMount(){
        this.loadHome()

        var value =  AsyncStorage.getItem('username');
        value.then((e)=> {
            GLOBAL.name = e;
        })

        var a = [];
        var values =  AsyncStorage.getItem('roleid');
        values.then((f)=> {
alert(f)
            status = f
            if (f == "6" || f == "7"){
               a = [
                    {
                        title :stringsoflanguages.create,
                        selected :'#E9ECF7',
                        image:require('./create-request.png')
                    },

                    {
                        title :stringsoflanguages.booking,
                        selected :'#F8FBF5',
                        image:require('./booking.png')
                    },
                    {
                        title :stringsoflanguages.invoice,
                        selected :'#FFFBF7',
                        image:require('./invoice.png')
                    },
                    {
                        title :stringsoflanguages.approval,
                        selected :'#FEF8F4',
                        image:require('./approval.png')
                    },
                    {
                        title :stringsoflanguages.dlr,
                        selected :'#F8F7FF',
                        image:require('./dlr.png')
                    },
                    {
                        title :stringsoflanguages.dpr,
                        selected :'#FDEDF3',
                        image:require('./dpr.png')
                    },


                ]
                this.setState({moviesList:a})
            }else if (f == "8" || f == "9"){
                alert('hi')
                a  = [

                    {
                        title :stringsoflanguages.dlr,
                        selected :'#F8F7FF',
                        image:require('./dlr.png')
                    },
                    {
                        title :stringsoflanguages.dpr,
                        selected :'#FDEDF3',
                        image:require('./dpr.png')
                    },


                ]
                this.setState({moviesList:a})
            }else if (f == "10"){
                a = [

                    {
                        title :stringsoflanguages.invoice,
                        selected :'#FFFBF7',
                        image:require('./invoice.png')
                    },
                    {
                        title :stringsoflanguages.approval,
                        selected :'#FEF8F4',
                        image:require('./approval.png')
                    },
                    {
                        title :stringsoflanguages.dlr,
                        selected :'#F8F7FF',
                        image:require('./dlr.png')
                    },
                    {
                        title :stringsoflanguages.dpr,
                        selected :'#FDEDF3',
                        image:require('./dpr.png')
                    },


                ]
                this.setState({moviesList:a})
            }


        })
    }
    _handlePress() {
        console.log('Pressed!');
        this.props.navigation.navigate('Location')
    }

    check = () => {
        this.setState({isSecure :!this.state.isSecure})
    }
    render() {
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




                    <View style = {{width :'100%',backgroundColor:'white',flexDirection: "row",justifyContent:'space-between'}}>
                        <Image style = {{width :160 ,height: 60,marginLeft:20,resizeMode: 'contain'}}
                               source={require('./logo-home.png')}/>

                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile')
                        }>

                        <Image style = {{width :60 ,height: 50,marginLeft:20,resizeMode: 'contain',alignSelf: 'flex-end',marginRight: 8,marginTop:4}}
                               source={require('./profile.png')}/>
                        </TouchableOpacity>


                    </View>

                    <View style = {{width :'90%',backgroundColor:'white',marginLeft:'5%',marginTop:15,borderRadius:12,height:100}}>

                        <Text style = {{color:'#042C5C',fontSize:20,margin:10,fontFamily:'AvenirLTStd-Heavy'}}>
                            {stringsoflanguages.welcomehome} {this.state.username.name}
                        </Text>

                        <Text style = {{color:'#77869E',fontSize:14,marginLeft:10,marginTop:0,fontFamily:'AvenirLTStd-Heavy'}}>
                            {stringsoflanguages.projectName}  :{this.state.username.project_name}
                        </Text>

                        <Text style = {{color:'#77869E',fontSize:14,marginLeft:10,marginTop:5,fontFamily:'AvenirLTStd-Heavy'}}>
                            {stringsoflanguages.homeLocation} :{this.state.username.address}
                        </Text>

                    </View>

                    <FlatList style= {{flexGrow:0,marginTop:5}}
                              data={this.state.moviesList}
                              numColumns={2}
                              keyExtractor = { (item, index) => index.toString() }
                              renderItem={this._renderItem}
                    />


                    <Dialog
                        visible={this.state.visible}
                        onTouchOutside={() => {
                            this.setState({ visible: false });
                        }}
                    >
                        <DialogContent>

                            <View style = {{width: window.width - 100}}>

                                <Image style = {{width :80 ,height :80,alignSelf:'center',resizeMode:'contain',marginTop:30}}
                                       source={require('./create-request-pop-img.png')}/>

                                <Text style = {{margin:10,textAlign: 'center',color:'#006FA5',fontSize: 18,marginTop: 12,fontFamily:'AvenirLTStd-Heavy'}}>
                                    {stringsoflanguages.option}

                                </Text>


                                <TouchableOpacity onPress={() => this.getSelections('2')
                                }>
                                <View style = {{flexDirection:'row'}}>

                                    <Image style = {{width :20 ,height :20,margin:10,resizeMode:'contain'}}
                                           source={require('./checkbox-blank-outline.png')}/>

                                    <Text style = {{marginLeft:10,color:'#77869E',fontSize: 13,fontFamily:'AvenirLTStd-Heavy',marginTop:14}}>
                                        {stringsoflanguages.muster}

                                    </Text>
                                </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.getSelections('1')
                                }>

                                <View style = {{flexDirection:'row'}}>

                                    <Image style = {{width :20 ,height :20,margin:10,resizeMode:'contain'}}
                                           source={require('./checkbox-blank-outline.png')}/>

                                    <Text style = {{marginLeft:10,color:'#77869E',fontSize: 13,fontFamily:'AvenirLTStd-Heavy',marginTop:14}}>
                                        {stringsoflanguages.measure}

                                    </Text>
                                </View>
                                </TouchableOpacity>




                            </View>
                        </DialogContent>
                    </Dialog>


                </View>


            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
    },
    container: {

        backgroundColor :'#F6F8F9',
        height:'100%',
        width:window.width,
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