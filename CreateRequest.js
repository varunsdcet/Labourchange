import React, {Component} from 'react';
import { StyleSheet,Text,TextInput, View,Image ,Alert,FlatList,Dimensions ,TouchableOpacity,ActivityIndicator,SafeAreaView} from 'react-native';
const window = Dimensions.get('window');
import Button from 'react-native-button';
import { TextField } from 'react-native-material-textfield';
type Props = {};
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import stringsoflanguages from './Local';
import axios from 'react-native-axios';
const GLOBAL = require('./Global');
import DateTimePicker from "react-native-modal-datetime-picker";
import { Dropdown } from 'react-native-material-dropdown';
var moment = require('moment');
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import Dialog, {DialogContent} from "react-native-popup-dialog";
import {NavigationActions, StackActions} from "react-navigation";
var type = 0;
var tomorrow;
export default class CreateRequest extends Component {
    state = {
        name :'',
        email:'',
        phone :'',
        company :'',
        catid:'',
        data:[],
        isDateTimePickerVisible: false,
        startDate:'',
        endDate:'',
        date :new Date(),
        mystart :'',
        value:1,
        values:1,
        visible:false,
        pop:'',
        done:false,
        get:'',

    };
    showDateTimePicker = (types) => {
        type =  types

        if (type == 0){
            var d = new Date();
            d.setDate(d.getDate() + 15);
            this.setState({date:d})
        }else{
            this.setState({date:this.state.mystart})

        }

        this.setState({ isDateTimePickerVisible: true });
    };
    hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
    };

    handleDatePicked = date => {
        if (type == 0){
            this.setState({mystart:date})
            this.setState({ startDate: date.toString() });
        }else{
            this.setState({ endDate: date.toString() });
        }

        this.hideDateTimePicker();
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

    getIndex = (index) => {

        GLOBAL.categoryid = this.state.data[index].id
        this.props.navigation.push('NewCate')
    }
    loadHome()
    {
        var self=this;
        var url = GLOBAL.BASE_URL + 'getcategory';
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

    _handlePresss =()=> {
        this.setState({visible:false})
        this.setState({done:true})



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


    myCallbackFunctionss = (res) => {
//      alert(JSON.stringify(res))
        this.hideLoading()
        if (res.status == 200){

            GLOBAL.requestid = res.request_id
            this.props.navigation.navigate('SucessBooking')

        }
        else{
            alert(stringsoflanguages.unable)
        }

    }
    myCallbackFunctions = (res) => {
//       alert(JSON.stringify(res))
        this.hideLoading()
        if (res.status == 200){
            this.setState({data:res.data})

        }
        else{
            alert(stringsoflanguages.unable)
        }

    }

    componentDidMount(){
        this.loadHome()
        this.props.navigation.addListener('willFocus',this._handleStateChange);
        //  tomorrow = new Date();
        //  tomorrow = moment(tomorrow).add(1, 'day').format('yyyy-MM-dd\'T\'HH:mm:ss.SSSz')
        // const myDate = moment(new Date()).format("YYYY-MM-DD[T]HH:mm:ss").toDate();
        //  alert(myDate)
        //   this.setState({date:myDate})
    }
    _handlePress() {



        if (this.state.done == true){

            if(this.state.name==''){
                alert('Please enter contract no.')
            }
            else if(this.state.startDate == ''){
                alert('Please select start date of work')
            }
            else if(this.state.endDate == ''){
                alert('Please select end date of work')
            }
            else{
                var cid = '';
                var nol = '';
                //    alert('test')
                for(let i = 0; i < GLOBAL.categoryArray.length; i++) {
                    cid = cid + GLOBAL.categoryArray[i].id + ','
                    nol = nol + GLOBAL.categoryArray[i].no_of_labour + ','
                }
                cid = cid.slice(0, -1);
                nol = nol.slice(0, -1);

                var self=this;
                var url = GLOBAL.BASE_URL + 'company_request';
                axios.post(url, {
                    user_id: GLOBAL.userID,
                    service_contract:this.state.name,
                    start_date :this.state.startDate,
                    end_date:this.state.endDate,
                    accomodation_provided : this.state.value - 1,
                    transport_provided :this.state.values - 1,
                    request_type :GLOBAL.type,
                    category_id :cid,
                    no_of_labour:nol

                })
                    .then(function (response) {

                        self.myCallbackFunctionss(response.data)

                    })
                    .catch(function (error) {
                        alert(error)
                        //  self.myCallbackFunction()

                    });


            }

        }else {

            if(this.state.name==''){
                alert('Please enter contract no.')
            }
            else if(this.state.startDate == ''){
                alert('Please select start date of work')
            }
            else if(this.state.endDate == ''){
                alert('Please select end date of work')
            }
            else{
                this.setState({visible:true})

                if (this.state.value == 2 && this.state.values == 2) {
                    this.setState({pop: stringsoflanguages.twotwo})

                } else if (this.state.value == 2 && this.state.values == 1) {
                    this.setState({pop: stringsoflanguages.twoone})
                } else if (this.state.value == 1 && this.state.values == 2) {
                    this.setState({pop: stringsoflanguages.onetwo})
                }
            }

        }
        // this.props.navigation.navigate('Otp')
    }

    _handleStateChange = state => {
alert(JSON.stringify(GLOBAL.categoryArray))
if (GLOBAL.categoryArray.length == 0){

}else {

    var c = "";
    for (let i = 0; i < GLOBAL.categoryArray.length; i++) {
        c = c + GLOBAL.categoryArray[i].name + ':' + GLOBAL.categoryArray[i].no_of_labour + ','


    }
    alert(c)
    this.setState({name:c})

}

    };

    check = () => {
        this.setState({isSecure :!this.state.isSecure})
    }



    render() {



        var radio_props_one = [
            {label: 'Yes', value: 1 },
            {label: 'No', value: 2 },

        ];

        let datas= [];
        let { name } = this.state;

        if(this.state.loading){
            return(
                <View style={styles.container}>
                    <ActivityIndicator style = {styles.loading}

                                       size="large" color='#006FA5' />
                </View>
            )
        }
        return (

            <View style={styles.container}>
                <KeyboardAwareScrollView keyboardShouldPersistTaps='always'>

                    <TouchableOpacity onPress={() => this.props.navigation.goBack()
                    }>

                        <Image style = {{width :30 ,height: 30,marginTop:'4%',marginLeft:20,resizeMode: 'contain'}}
                               source={require('./back.png')}/>

                    </TouchableOpacity>


                    <Text style = {{marginLeft: '5%',width:'90%',color:'#006FA5',fontSize: 30,marginTop: '5%',fontFamily:'AvenirLTStd-Heavy'}}>
                        {stringsoflanguages.create}

                    </Text>


                    <View style = {{marginLeft:'5%',width:'90%',marginTop:'3%'}}>

                        <TextField
                            label={stringsoflanguages.selectContract}
                            value={ GLOBAL.serviceContract }
                            editable = {false}

                            onChangeText={ (name) => this.setState({ name }) }
                        />


                        {GLOBAL.type == "1" && (
                            <Dropdown containerStyle={{width:'100%', height:50, marginTop:-10}}
                                      fontSize={14}
                                      labelFontSize={13}
                                      dropdownPosition = {-4.2}
                                      onChangeText ={ (value,index) => this.getIndex(index) }

                                      label={stringsoflanguages.selectCategory}
                                      data={this.state.data}
                            />
                        )}

                        {GLOBAL.type == "2" && (
                            <TextField
                                label={stringsoflanguages.selectCategory}
                                value={name}
                                editable = {false}
                                onChangeText={ (name) => this.setState({ name }) }
                            />
                        )}
                        {GLOBAL.type == "2" && (
                            <TouchableOpacity  style = {{width :16 ,height: 16,marginLeft:window.width - 60,marginTop:-30}}


                                               onPress={() => this.props.navigation.navigate('SelectCategory')
                                               }>

                                <Image style = {{resizeMode: 'contain'}}
                                       source={require('./arrow-down.png')}/>



                            </TouchableOpacity>
                        )}

                        <View style={{marginTop:30}}>
                            <DateTimePicker
                                isVisible={this.state.isDateTimePickerVisible}
                                mode = 'date'
                                onConfirm={this.handleDatePicked}
                                onCancel={this.hideDateTimePicker}
                                format="DD/MM/YYYY"
                                minimumDate = {this.state.date}

                            />

                            {this.state.startDate == '' &&(

                                <TextField
                                    label={stringsoflanguages.expectedStart}
                                    value={'Select Start Date'}
                                    editable = {false}
                                    onChangeText={ (startDate) => this.setState({ startDate }) }
                                />

                            )}

                            {this.state.startDate!='' &&(
                                <TextField
                                    label={stringsoflanguages.expectedStart}
                                    value={moment(this.state.startDate).format('DD/MM/YYYY')}
                                    editable = {false}
                                    onChangeText={ (startDate) => this.setState({ startDate }) }
                                />

                            )}
                            <TouchableOpacity  style = {{width :16 ,height: 16,marginLeft:window.width - 60,marginTop:-30}}


                                               onPress={() => this.showDateTimePicker(0)
                                               }>

                                <Image style = {{resizeMode: 'contain'}}
                                       source={require('./arrow-down.png')}/>

                            </TouchableOpacity>
                        </View>

                        <View style={{marginTop:30}}>

                            {this.state.endDate =='' &&(

                                <TextField
                                    label={stringsoflanguages.expectedEnd}
                                    value={'Select End Date'}
                                    editable = {false}
                                    onChangeText={ (endDate) => this.setState({ endDate }) }
                                />

                            )}

                            {this.state.endDate!='' &&(
                                <TextField
                                    label={stringsoflanguages.expectedEnd}
                                    value={moment(this.state.endDate).format('DD/MM/YYYY')}
                                    editable = {false}
                                    onChangeText={ (endDate) => this.setState({ endDate }) }
                                />

                            )}
                            <TouchableOpacity  style = {{width :16 ,height: 16,marginLeft:window.width - 60,marginTop:-30}}


                                               onPress={() => this.showDateTimePicker(1)
                                               }>

                                <Image style = {{resizeMode: 'contain'}}
                                       source={require('./arrow-down.png')}/>

                            </TouchableOpacity>

                        </View>
                        <Text style = {{color:'grey',fontSize: 15,marginTop: 30}}>
                            {stringsoflanguages.site}

                        </Text>



                        <RadioForm style={{marginLeft:0, marginTop:10}}
                                   labelStyle={{paddingRight:20}}
                                   radio_props={radio_props_one}
                                   initial={0}
                                   buttonSize={12}
                                   formHorizontal={true}
                                   buttonColor={'#006FA5'}
                                   labelHorizontal={true}
                                   animation={false}
                                   labelColor={'black'}
                                   selectedButtonColor={'#006FA5'}
                                   onPress={(value) => {this.setState({value:value});}}
                        />

                        <Text style = {{color:'grey',fontSize: 15,marginTop: 30}}>
                            {stringsoflanguages.transport}

                        </Text>



                        <RadioForm style={{marginLeft:0, marginTop:10}}
                                   labelStyle={{paddingRight:20}}
                                   radio_props={radio_props_one}
                                   initial={0}
                                   buttonSize={12}
                                   formHorizontal={true}
                                   buttonColor={'#006FA5'}
                                   labelHorizontal={true}
                                   animation={false}
                                   labelColor={'black'}
                                   selectedButtonColor={'#006FA5'}
                                   onPress={(values) => {this.setState({values:values});}}
                        />

                    </View>




                    <Dialog
                        visible={this.state.visible}
                        onTouchOutside={() => {
                            this.setState({ visible: false });
                        }}
                    >
                        <DialogContent>

                            <View>

                                <Image style = {{width :80 ,height :80,alignSelf:'center',resizeMode:'contain',marginTop:30}}
                                       source={require('./info-with-circle.png')}/>

                                <Text style = {{margin:10,textAlign: 'center',color:'#006FA5',fontSize: 18,marginTop: 12,fontFamily:'AvenirLTStd-Heavy'}}>
                                    {this.state.pop}

                                </Text>

                                <Button
                                    style={{padding:6,fontSize: 16, color: '#77869E',backgroundColor:'white',borderWidth:1,borderColor:'#77869E',alignSelf:'center',width:'30%',height:30,fontFamily:'AvenirLTStd-Heavy',borderRadius:4}}
                                    styleDisabled={{color: 'red'}}
                                    onPress={() => this._handlePresss()}>
                                    {stringsoflanguages.ok}
                                </Button>



                            </View>
                        </DialogContent>
                    </Dialog>




                    <Button
                        style={{padding:8,marginTop:20,fontSize: 18, color: 'white',backgroundColor:'#006FA5',marginLeft:'5%',width:'90%',height:40,fontFamily:'AvenirLTStd-Heavy',borderRadius:4}}
                        styleDisabled={{color: 'red'}}
                        onPress={() => this._handlePress()}>
                        {stringsoflanguages.submit}
                    </Button>




                </KeyboardAwareScrollView>

            </View>

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
