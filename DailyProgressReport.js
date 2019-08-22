import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    Textinput,
    View,
    Image,
    Alert,
    FlatList,
    Dimensions,
    TouchableOpacity,
    ActivityIndicator,
    SafeAreaView,
    TextInput
} from 'react-native';
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
var type = 0;
var tomorrow;
export default class DailyProgressReport extends Component {
    state = {
        name :'',

        email:'',
        phone :'',
        company :'',
        categoryArray:[],
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
        datas:[],
        datass:[],
        moviesList:[""],
        selectedCategory:[""],
        finalArray :[

            {
                cid:'',
                code:'',
                deduction:'',
                dwork:'',
                dl:'',
                db:'',
                dh:'',
                total:'',
                mydata:[],
                index:0,
                data :[
                    {
                        my:'',
                        formula:[],
                        work:'',
                        l:'',
                        b:'',
                        h:'',
                        unit:'',
                        qty:'',
                    }
                ]

            }

        ],

    };
    showDateTimePicker = (types) => {
        type =  types

        if (type == 0){
            var d = new Date();
            d.setDate(d.getDate() + 10);
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


        this.setState({ startDate: date.toString() });


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

        GLOBAL.bid = this.state.data[index].id

        this.timeoutCheck = setTimeout(() => {
            this.loadHomes();
        }, 400)

        //delay(() => this.loadHomes(GLOBAL.bid), 1000);
        //this.props.navigation.push('NewCate')
    }

    cal = (c,inde) => {
        this.loadHomess(c,inde)
        var a = this.state.finalArray[inde]
        a.cid = c
        a.data[0].my = inde

        this.state.finalArray[inde] = a

        this.setState({finalArray :this.state.finalArray})



    }
    getCat= (index,inde) => {

      var c  = this.state.categoryArray[index].id
        this.timeoutCheck = setTimeout(() => {
          this.cal(c,inde)



        }, 100)
        //   loadHomes(GLOBAL.bid)
        //this.props.navigation.push('NewCate')
    }

    getCode = (index,indexs,data,data1) => {




        var a = this.state.finalArray[indexs]
        a.code = data
        a.index = index
        a.data[0].formula =  data1.mydata[index].formula
        a.data[0].unit =  data1.mydata[index].unit

        this.state.finalArray[indexs] = a

        this.setState({finalArray :this.state.finalArray})

        alert(JSON.stringify(this.state.finalArray))

    }
    getIndexsc = (index,indexs,data,data1) => {
           this.timeoutCheck = setTimeout(() => {
        this.getCode(index,indexs,data,data1)
           }, 800)
        //   loadHomes(GLOBAL.bid)
        //this.props.navigation.push('NewCate')

    }
    getIndexs = (index) => {


         GLOBAL.cid = this.state.datas[index].id

    }
    loadHomes=()=>
    {
        var self=this;
        var url = GLOBAL.BASE_URL + 'getcontractor';
        axios.post(url, {
            order_id: GLOBAL.bid,

        })
            .then(function (response) {

                self.myCallbackFunctionss(response.data)

            })
            .catch(function (error) {
                alert(error)
                //  self.myCallbackFunction()

            });
    }

    loadHomess=(c,inde)=>
    {

        var self=this;
        var url = GLOBAL.BASE_URL + 'getdpr_item';
        axios.post(url, {
            user_id: GLOBAL.userID,
            category_id:c

        })
            .then(function (response) {

                self.myCallbackFunctionss0(response.data,inde)

            })
            .catch(function (error) {
                alert(error)
                //  self.myCallbackFunction()

            });
    }

    category = (res) => {
        alert(JSON.stringify(res))
        this.hideLoading()
        if (res.status == 200){
            this.setState({categoryArray:res.data})


        }
        else{
            alert(stringsoflanguages.unable)
        }

    }
    getCategory()
    {
        var self=this;
        var url = GLOBAL.BASE_URL + 'getcategory';
        axios.post(url, {
            user_id: GLOBAL.userID,

        })
            .then(function (response) {

                self.category(response.data)

            })
            .catch(function (error) {
                alert(error)
                //  self.myCallbackFunction()

            });
    }

    loadHome()
    {
        var self=this;
        var url = GLOBAL.BASE_URL + 'getbookinid';
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

    // _handlePresss =()=> {
    //     this.setState({visible:false})
    //     this.setState({done:true})
    //
    //
    //
    // }
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


    myCallbackFunctionss1 = (res) => {
        alert(JSON.stringify(res))
        this.hideLoading()
        if (res.status == 200){



            //   GLOBAL.requestid = res.request_id
            //  this.props.navigation.navigate('SucessBooking')

        }
        else{
            alert(stringsoflanguages.unable)
        }

    }
    myCallbackFunctions = (res) => {
        alert(JSON.stringify(res))
        this.hideLoading()
        if (res.status == 200){
            this.setState({data:res.data})

        }
        else{
            alert(stringsoflanguages.unable)
        }

    }

    myCallbackFunctionss = (res) => {
        alert(JSON.stringify(res))
        this.hideLoading()
        if (res.status == 200){
            this.setState({datas:res.data})

        }
        else{
            alert(stringsoflanguages.unable)
        }

    }

    myCallbackFunctionss0 = (res,inde) => {

        this.hideLoading()
        if (res.status == 200){

            var a = this.state.finalArray[inde]
            a.mydata = res.data
            this.state.finalArray[inde] = a
            this.setState({finalArray:this.state.finalArray})

           // this.setState({datass:res.data})

        }
        else{
            alert(stringsoflanguages.unable)
        }

    }


    componentDidMount(){
        this.loadHome()
        this.getCategory()
        //  tomorrow = new Date();
        //  tomorrow = moment(tomorrow).add(1, 'day').format('yyyy-MM-dd\'T\'HH:mm:ss.SSSz')
        // const myDate = moment(new Date()).format("YYYY-MM-DD[T]HH:mm:ss").toDate();
        //  alert(myDate)
        //   this.setState({date:myDate})
    }
    hi = () => {
        alert('dd')
    }
    _handlePress() {

        var self=this;
        var url = GLOBAL.BASE_URL + 'dpr_store';
        var k = JSON.stringify(this.state.finalArray)
        alert(k)
        axios.post(url, {
            user_id: GLOBAL.userID,
            order_id:GLOBAL.bid,
            contractor_id :GLOBAL.cid,
            reporting_date : this.state.startDate,
            data:this.state.finalArray,
        })
            .then(function (response) {
                self.myCallbackFunctionss1(response.data)
            })
            .catch(function (error) {
                alert(error)
                //  self.myCallbackFunction()

            });





        // this.props.navigation.navigate('Otp')
    }

    _handlePresss1 = () => {



        var a = this.state.finalArray
        var b = a

        var dict =
            {
                cid:'',
                code:'',
                deduction:'',
                total:'',
                mydata:[],
                index:0,
                data :[
                    {
                        my:'',
                        formula:[],
                        work:'',
                        l:'',
                        b:'',
                        h:'',
                        unit:'',
                        qty:'',
                    }
                ]

            }

        b.push(dict)
        this.state.finalArray = b
        this.setState({finalArray:this.state.finalArray})

    }
    _handlePresss = () => {
        var dict =
            [{
                my:'',
                formula:[],
                work:'',
                l:'',
                b:'',
                h:'',
                unit:'',
                qty:'',
            }]


      var a = this.state.finalArray[this.state.finalArray.length - 1]
        var b = a.data

        var dict =
            {
                my:'',
                formula:b[0].formula,
                work:'',
                l:'',
                b:'',
                h:'',
                unit:b[0].unit,
                qty:'',
            }

        b.push(dict)
        this.state.finalArray[this.state.finalArray.length - 1].data = b
        this.setState({finalArray:this.state.finalArray})

    }
    check = () => {
        this.setState({isSecure :!this.state.isSecure})
    }

    _renderItem = ({item,index,a}) => {




        return (
            <View style = {{width:'100%'}}>





                    <View style = {{flexDirection: 'row',backgroundColor:"white",height:50,marginTop:2,width:'100%'}}>

                        <TextInput style = {{width:'37%',backgroundColor:'#dedede',margin:8,marginLeft:0}}


                            placeholderTextColor= '#D3D3D'
                                   value = {item.work}
                                   onChangeText={text => {
                                       let { finalArray } = this.state;
                                       finalArray[0].data[index].work = text;
                                       this.setState({
                                           finalArray,
                                       });
                                   }}




                        />
                        {typeof item.formula[0] != 'undefined'  && (
                        <View style = {{width:'8%',marginTop:8}}>
                            <TextInput style = {{backgroundColor:'#dedede',height:30}}


                                       placeholderTextColor= '#D3D3D'
                                       keyboardType = "number-pad"
                                       value = {item.l}
                                       placeholderTextColor= '#D3D3D'

                                       onChangeText={text => {
                                           let { finalArray } = this.state;
                                           finalArray[0].data[index].l = text;
                                           this.setState({
                                               finalArray,
                                           });
                                       }}


                            />

                        </View>
                        )}
                        {typeof item.formula[1] != 'undefined'  && (
                        <View style = {{marginLeft :'6%',width:'8%',marginTop:8}}>
                            <TextInput style = {{backgroundColor:'#dedede',height:30}}


                                       placeholderTextColor= '#D3D3D'
                                       keyboardType = "number-pad"
                                       value = {item.b}
                                       onChangeText={text => {
                                           let { finalArray } = this.state;
                                           finalArray[0].data[index].b = text;
                                           this.setState({
                                               finalArray,
                                           });
                                       }}



                            />

                        </View>
                        )}
                        {typeof item.formula[2] != 'undefined' && (
                            <View style={{marginLeft: '6%', width: '8%', marginTop: 8}}>
                                <TextInput style={{backgroundColor: '#dedede', height: 30}}

                                           value = {item.h}
                                           placeholderTextColor='#D3D3D'
                                           keyboardType="number-pad"
                                           onChangeText={text => {
                                               let { finalArray } = this.state;
                                               finalArray[0].data[index].h = text;
                                               this.setState({
                                                   finalArray,
                                               });
                                           }}


                                />

                            </View>
                        )
                        }


                        <View style = {{marginLeft :'6%',width:'9%',marginTop:8}}>
                            <TextInput style = {{height:30}}


                                       placeholderTextColor= '#D3D3D'
                                       keyboardType = "number-pad"
                                       value = {item.unit}



                            />

                        </View>

                        <View style = {{marginLeft:'3%',width:'10%',marginTop:15}}>
                            <Text style = {{fontSize : 14,color :'black', height:'auto',fontFamily:'AvenirLTStd-Medium',alignSelf:'center'}}>
                                {item.qty}

                            </Text>



                        </View>


                    </View>







            </View>

        )
    }

    render() {



        let added_buttons_goes_here = this.state.finalArray.map( (data, indexs) => {

            return (
                <View >
                <View style = {{width:'100%'}}>

                    <View style = {{marginTop:16}}>


                        <Dropdown containerStyle={{width:'100%', height:50, marginTop:-10}}
                                  fontSize={14}
                                  labelFontSize={13}
                                  dropdownPosition = {-2.2}
                                  onChangeText ={ (value,index) => this.getCat(index,indexs) }

                                  label={stringsoflanguages.selectCategory}
                                  data={this.state.categoryArray}
                        />
                        {data.cid != '' && (

                        <Dropdown containerStyle={{width:'100%', height:50, marginTop:10}}
                                  fontSize={14}
                                  labelFontSize={13}
                                  dropdownPosition = {-2.2}
                                  onChangeText ={ (value,index) => this.getIndexsc(index,indexs,value,data) }

                                  label={stringsoflanguages.code}
                                  data={data.mydata}
                        />

                        )}




                    </View>


                    {data.code != '' && (
                    <View style = {{flexDirection: 'row',backgroundColor:"#006FA5",height:50,marginTop:30,width:'100%'}}>

                        <Text style = {{fontSize : 14,color :'white', height:'auto',fontFamily:'AvenirLTStd-Medium',width:'30%',margin:8}}>
                            {stringsoflanguages.work}

                        </Text>

                        <View style = {{width:'12%',marginTop:8}}>

                            <Text style = {{fontSize : 14,color :'white', height:'auto',fontFamily:'AvenirLTStd-Medium',alignSelf:'center'}}>
                                {data.mydata[data.index].formula[0]}

                            </Text>



                        </View>


                        <View style = {{width:'12%',marginTop:8}}>
                            <Text style = {{fontSize : 14,color :'white', height:'auto',fontFamily:'AvenirLTStd-Medium',alignSelf:'center'}}>
                                {data.mydata[data.index].formula[1]}


                            </Text>



                        </View>
                        {typeof data.mydata[data.index].formula[2] != 'undefined'  && (

                        <View style = {{width:'12%',marginTop:8}}>
                            <Text style = {{fontSize : 14,color :'white', height:'auto',fontFamily:'AvenirLTStd-Medium',alignSelf:'center'}}>
                                {data.mydata[data.index].formula[2]}

                            </Text>



                        </View>
                        )}
                        {typeof data.mydata[data.index].formula[2] == 'undefined' && (
                            <View style = {{width:'12%',marginTop:8}}>
                                <Text style = {{fontSize : 14,color :'white', height:'auto',fontFamily:'AvenirLTStd-Medium',alignSelf:'center'}}>


                                </Text>



                            </View>
                        )
                        }

                        <View style = {{width:'12%',marginTop:8}}>
                            <Text style = {{fontSize : 14,color :'white', height:'auto',fontFamily:'AvenirLTStd-Medium',alignSelf:'center'}}>
                                Unit

                            </Text>



                        </View>

                        <View style = {{width:'10%',marginTop:8}}>
                            <Text style = {{fontSize : 14,color :'white', height:'auto',fontFamily:'AvenirLTStd-Medium',alignSelf:'center'}}>
                                Qty

                            </Text>



                        </View>


                    </View>
                    )}

                </View>

                    {data.code != '' && (

                        data.data.map( (item, index) => {
                                return (

                            <View style = {{width:'100%'}}>





                                <View style = {{flexDirection: 'row',backgroundColor:"white",height:50,marginTop:2,width:'100%'}}>
                                    {typeof item.formula[2] != 'undefined'  && (
                                    <TextInput style = {{width:'30%',backgroundColor:'#dedede',margin:8,marginLeft:0}}


                                               placeholderTextColor= '#D3D3D'
                                               value = {item.work}
                                               onChangeText={text => {
                                                   let { finalArray } = this.state;
                                                   finalArray[indexs].data[index].work = text;
                                                   this.setState({
                                                       finalArray,
                                                   });
                                               }}




                                    />
                                    )}
                                    {typeof item.formula[2] == 'undefined'  && (
                                        <TextInput style = {{width:'34%',backgroundColor:'#dedede',margin:8,marginLeft:0}}


                                                   placeholderTextColor= '#D3D3D'
                                                   value = {item.work}
                                                   onChangeText={text => {
                                                       let { finalArray } = this.state;
                                                       finalArray[indexs].data[index].work = text;
                                                       this.setState({
                                                           finalArray,
                                                       });
                                                   }}




                                        />
                                    )}
                                    {typeof item.formula[0] != 'undefined'  && (

                                        <View style = {{width:'8%',marginTop:8}}>
                                            <TextInput style = {{backgroundColor:'#dedede',height:30}}


                                                       placeholderTextColor= '#D3D3D'
                                                       keyboardType = "number-pad"
                                                       value = {item.l}
                                                       placeholderTextColor= '#D3D3D'

                                                       onChangeText={text => {
                                                           let { finalArray } = this.state;
                                                           finalArray[indexs].data[index].l = text;
                                                           this.setState({
                                                               finalArray,
                                                           });
                                                       }}


                                            />


                                       </View>

                                    )}
                                    {typeof item.formula[1] != 'undefined'  && (
                                        <View style = {{marginLeft :'6%',width:'8%',marginTop:8}}>
                                            <TextInput style = {{backgroundColor:'#dedede',height:30}}


                                                       placeholderTextColor= '#D3D3D'
                                                       keyboardType = "number-pad"
                                                       value = {item.b}
                                                       onChangeText={text => {
                                                           let { finalArray } = this.state;
                                                           finalArray[indexs].data[index].b = text;
                                                           if ( finalArray[indexs].data[index].l == "" || finalArray[indexs].data[index].b == ""  ){

                                                           }else {
                                                               var k = parseFloat(finalArray[indexs].data[index].l) * parseFloat(finalArray[indexs].data[index].b)
                                                               finalArray[indexs].data[index].qty = k.toString()
                                                               var d = finalArray[indexs].data

                                                               var c = 0

                                                               for (let i = 0; i < d.length ; i++){
                                                                   var m = parseFloat(d[i].qty)
                                                                   c = c + m
                                                               }

                                                               finalArray[indexs].total = c.toString();
                                                           }
                                                           this.setState({
                                                               finalArray,
                                                           });
                                                       }}



                                            />

                                        </View>
                                    )}
                                    {typeof item.formula[2] != 'undefined' && (
                                        <View style={{marginLeft: '6%', width: '8%', marginTop: 8}}>
                                            <TextInput style={{backgroundColor: '#dedede', height: 30}}

                                                       value = {item.h}
                                                       placeholderTextColor='#D3D3D'
                                                       keyboardType="number-pad"
                                                       onChangeText={text => {


                                                           let { finalArray } = this.state;
                                                           finalArray[indexs].data[index].h = text;
                                                           if ( finalArray[indexs].data[index].l == "" || finalArray[indexs].data[index].b == "" || finalArray[indexs].data[index].h == ""  ){

                                                           }else {
                                                               var k = parseFloat(finalArray[indexs].data[index].l) * parseFloat(finalArray[indexs].data[index].b) * parseFloat(finalArray[indexs].data[index].h)
                                                               finalArray[indexs].data[index].qty = k.toString()
                                                               finalArray[indexs].total = k.toString();
                                                               var c = 0
                                                               var d = finalArray[indexs].data
                                                               for (let i = 0; i < d.length ; i++){
                                                                   var m = parseFloat(d[i].qty)
                                                                   c = c + m
                                                               }

                                                               finalArray[indexs].total = c.toString();
                                                           }

                                                           this.setState({
                                                               finalArray,
                                                           });
                                                       }}


                                            />

                                        </View>
                                    )
                                    }


                                    <View style = {{marginLeft :'6%',width:'9%',marginTop:8}}>
                                        <TextInput style = {{height:30}}


                                                   placeholderTextColor= '#D3D3D'
                                                   keyboardType = "number-pad"
                                                   value = {item.unit}



                                        />

                                    </View>

                                    <View style = {{marginLeft:'3%',width:'10%',marginTop:15}}>
                                        <Text style = {{fontSize : 14,color :'black', height:'auto',fontFamily:'AvenirLTStd-Medium',alignSelf:'center'}}>
                                            {item.qty}

                                        </Text>



                                    </View>


                                </View>







                            </View>
                                )
                            })


                    )}

                    {data.code != '' && (
            <Button
                style={{marginTop:12,padding:6,fontSize: 16, color: '#77869E',backgroundColor:'white',borderWidth:1,borderColor:'#77869E',width:'30%',height:30,fontFamily:'AvenirLTStd-Heavy',borderRadius:4}}
                styleDisabled={{color: 'red'}}
                onPress={() => this._handlePresss()}>
                {stringsoflanguages.add}
            </Button>
                    )}
                    {data.code != '' && (


            <View style = {{width:'100%',height:30,marginTop:'5%'}}>
                <Text style = {{fontSize : 14,color :'#77869E', height:'auto',fontFamily:'AvenirLTStd-Medium',width:'80%'}}>
                    Deductions

                </Text>
                <View style = {{flexDirection:'row',width:'100%',height:30,marginTop:'5%',marginBottom: 40}}>


                    <TextInput style = {{backgroundColor:'#dedede',height:30,width:'30%'}}


                               placeholderTextColor= '#D3D3D'
                               keyboardType = "number-pad"
                               onChangeText={text => {


                                   let { finalArray } = this.state;
                                   finalArray[indexs].dwork = text;


                                   this.setState({
                                       finalArray,
                                   });
                               }}


                    />


                    <TextInput style = {{marginLeft:3,backgroundColor:'#dedede',height:30,width:'15%'}}


                               placeholderTextColor= '#D3D3D'
                               keyboardType = "number-pad"
                               onChangeText={text => {


                                   let { finalArray } = this.state;
                                   finalArray[indexs].dl = text;


                                   this.setState({
                                       finalArray,
                                   });
                               }}


                    />

                    <TextInput style = {{marginLeft:3,backgroundColor:'#dedede',height:30,width:'15%'}}


                               placeholderTextColor= '#D3D3D'
                               keyboardType = "number-pad"
                               onChangeText={text => {


                                   let { finalArray } = this.state;
                                   finalArray[indexs].db = text;
                                   finalArray[indexs].deduction = parseFloat( finalArray[indexs].dl) * parseFloat( finalArray[indexs].db) ;

                                   var d = finalArray[indexs].data

                                   var c = 0

                                   for (let i = 0; i < d.length ; i++){
                                       var m = parseFloat(d[i].qty)
                                       c = c + m
                                   }

                                   var m = parseFloat(finalArray[indexs].deduction)
                                   var l = c - m

                                   finalArray[indexs].total = l.toString();





                                   this.setState({
                                       finalArray,
                                   });

                                   this.setState({
                                       finalArray,
                                   });
                               }}


                    />
                    {typeof data.mydata[data.index].formula[2] != 'undefined'  && (

                    <TextInput style = {{marginLeft:3,backgroundColor:'#dedede',height:30,width:'15%'}}


                               placeholderTextColor= '#D3D3D'
                               keyboardType = "number-pad"
                               onChangeText={text => {


                                   let { finalArray } = this.state;
                                   finalArray[indexs].dh = text;




                                   finalArray[indexs].deduction = parseFloat( finalArray[indexs].dl) * parseFloat( finalArray[indexs].db) * parseFloat( finalArray[indexs].dh);

                                   var d = finalArray[indexs].data

                                   var c = 0

                                   for (let i = 0; i < d.length ; i++){
                                       var m = parseFloat(d[i].qty)
                                       c = c + m
                                   }

                                   var m = parseFloat(finalArray[indexs].deduction)
                                   var l = c - m

                                   finalArray[indexs].total = l.toString();





                                   this.setState({
                                       finalArray,
                                   });
                               }}


                    />
                    )}

                    <View style = {{width:'12%',marginTop:8}}>
                        <Text style = {{fontSize : 14,color :'black', height:'auto',fontFamily:'AvenirLTStd-Medium',alignSelf:'center'}}>
                            { data.mydata[data.index].unit}

                        </Text>



                    </View>


                <TextInput style = {{marginLeft:3,backgroundColor:'#dedede',height:30,width:60}}


                           placeholderTextColor= '#D3D3D'
                           keyboardType = "number-pad"
                           value = {this.state.finalArray[indexs].deduction}
                           onChangeText={text => {


                               let { finalArray } = this.state;
                               finalArray[indexs].deduction = text;

                               var d = finalArray[indexs].data

                               var c = 0

                               for (let i = 0; i < d.length ; i++){
                                   var m = parseFloat(d[i].qty)
                                   c = c + m
                               }

                               var m = parseFloat(finalArray[indexs].deduction)
                               var l = c - m

                               finalArray[indexs].total = l.toString();
                               this.setState({
                                   finalArray,
                               });
                           }}


                />
                </View>

            </View>
                    )}
                    {data.code != '' && (
            <View style = {{flexDirection: 'row',backgroundColor:"#dedede",height:30,marginTop:60,width:'100%'}}>

                <Text style = {{fontSize : 14,color :'black', height:'auto',fontFamily:'AvenirLTStd-Medium',width:'30%',margin:8}}>
                    Total

                </Text>

                <View style = {{width:'18%',marginTop:8}}>
                    <Text style = {{fontSize : 14,color :'black', height:'auto',fontFamily:'AvenirLTStd-Medium',alignSelf:'center'}}>


                    </Text>



                </View>

                <View style = {{width:'18%',marginTop:8}}>
                    <Text style = {{fontSize : 14,color :'black', height:'auto',fontFamily:'AvenirLTStd-Medium',alignSelf:'center'}}>


                    </Text>



                </View>


                <View style = {{width:'18%',marginTop:8}}>
                    <Text style = {{fontSize : 14,color :'black', height:'auto',fontFamily:'AvenirLTStd-Medium',alignSelf:'center'}}>


                    </Text>



                </View>

                <View style = {{width:'10%',marginTop:8}}>
                    <Text style = {{fontSize : 14,color :'black', height:'auto',fontFamily:'AvenirLTStd-Medium',alignSelf:'center'}}>
                        {data.total}

                    </Text>



                </View>


            </View>

                    )}

                </View>
            )
        });





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
            <SafeAreaView>
                <View style={styles.container}>
                    <KeyboardAwareScrollView>

                        <TouchableOpacity onPress={() => this.props.navigation.goBack()
                        }>

                            <Image style = {{width :30 ,height: 30,marginTop:'4%',marginLeft:20,resizeMode: 'contain'}}
                                   source={require('./back.png')}/>

                        </TouchableOpacity>


                        <Text style = {{marginLeft: '5%',width:'90%',color:'#006FA5',fontSize: 30,marginTop: '4%',fontFamily:'AvenirLTStd-Heavy'}}>
                            {stringsoflanguages.dprs}

                        </Text>


                        <View style = {{marginLeft:'5%',width:'90%',marginTop:'3%'}}>


                            <Dropdown containerStyle={{width:'100%', height:50, marginTop:-10}}
                                      fontSize={14}
                                      labelFontSize={13}
                                      dropdownPosition = {-4.2}
                                      onChangeText ={ (value,index) => this.getIndex(index) }

                                      label={stringsoflanguages.bookingIds}
                                      data={this.state.data}

                            />

                            <View style = {{marginTop:16}}>

                                <Dropdown containerStyle={{width:'100%', height:50, marginTop:-10}}
                                          fontSize={14}
                                          labelFontSize={13}
                                          dropdownPosition = {-2.2}
                                          onChangeText ={ (value,index) => this.getIndexs(index) }

                                          label={stringsoflanguages.cid}
                                          data={this.state.datas}
                                />
                            </View>





                            <DateTimePicker
                                isVisible={this.state.isDateTimePickerVisible}
                                mode = 'date'
                                onConfirm={this.handleDatePicked}
                                onCancel={this.hideDateTimePicker}
                                format="DD/MM/YYYY"
                                minimumDate = {new Date()}

                            />
                            <View style = {{marginTop:12}}>

                                <TextField
                                    label={stringsoflanguages.reportingdate}
                                    value={moment(this.state.startDate).format('DD/MM/YYYY')}
                                    editable = {false}
                                    onChangeText={ (startDate) => this.setState({ startDate }) }
                                />
                            </View>
                            <TouchableOpacity  style = {{width :16 ,height: 16,marginLeft:window.width - 60,marginTop:-30}}


                                               onPress={() => this.showDateTimePicker(0)
                                               }>

                                <Image style = {{resizeMode: 'contain'}}
                                       source={require('./arrow-down.png')}/>

                            </TouchableOpacity>



{added_buttons_goes_here}

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


<View  style = {{flexDirection:'row',marginLeft:'5%',width:'90%'}}>

                        <Button
                            style={{padding:10,marginTop:20,fontSize: 20, color: 'white',backgroundColor:'#006FA5',width:window.width/2 - 30,height:40,fontFamily:'AvenirLTStd-Heavy',borderRadius:4}}
                            styleDisabled={{color: 'red'}}
                            onPress={() => this._handlePresss1()}>
                            {stringsoflanguages.add}
                        </Button>

    <Button
        style={{padding:10,marginTop:20,fontSize: 20, color: 'white',backgroundColor:'#006FA5',marginLeft:'7%',width:window.width/2 - 30,height:40,fontFamily:'AvenirLTStd-Heavy',borderRadius:4}}
        styleDisabled={{color: 'red'}}
        onPress={() => this._handlePress()}>
        {stringsoflanguages.submit}
    </Button>

</View>




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