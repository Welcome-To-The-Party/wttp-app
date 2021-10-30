import React from 'react';
import { StyleSheet, Text, View, Modal, ScrollView, TouchableOpacity } from 'react-native';

import TextButtonCE from '../Buttons/TextButtonCE';

const global_months = [ "Jan" , "Fev", "Mars", "Avril", "May", "Juin",
  "Juil", "Aout", "Sept", "Oct", "Nov", "Dec" ];
const global_day = [ "Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam" ];
const hours = [ "00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00",
  "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00","17:00",
  "18:00", "19:00", "20:00", "21:00", "22:00", "23:00" ];

export default class Calendar extends React.Component
{
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      today: new Date(),
      end: new Date(),
      setDate: false,
      start_time: 0,
      end_time: 0,
      month_index: -1,
      last_month: -1,
      next_month: -1,
    };

    this.addMonths = this.addMonths.bind(this);
    this.remMonths = this.remMonths.bind(this);
    this.setModal = this.setModal.bind(this);
    this.addDay = this.addDay.bind(this);
    this.setDay = this.setDay.bind(this);
    this.setStartTime = this.setStartTime.bind(this);
    this.setEndTime = this.setEndTime.bind(this);
    this.createDate = this.createDate.bind(this);
  }

componentDidUpdate(){
  if (this.props.date === "" && this.state.setDate === true) {
    this.setState({
      today: new Date(),
      end: new Date(),
      setDate: false,
      start_time: 0,
      end_time: 0,
      month_index: -1,
      last_month: -1,
      next_month: -1,
    })
  }
}

  setStartTime(time) {
    var date = new Date(this.state.today.getTime())
    date.setMinutes(0);
    date.setSeconds(0);
    date.setHours(time + 1);
    this.setState({today: date});
    this.setState({start_time: time});
  }
  setEndTime(time) {
    var date = new Date(this.state.end.getTime())
    date.setMinutes(0);
    date.setSeconds(0);
    date.setHours(time + 1);
    this.setState({end: date});
    this.setState({end_time: time});
  }

  setModal() {
    this.setState({showModal: ! this.state.showModal});
  }

  createDate() {
    this.props.set(this.state.today, this.state.end);
    this.setState({setDate: true});
    this.setState({showModal: ! this.state.showModal});
  }

  remMonths() {
    console.log("in del month");
    var date = new Date(this.state.today.getTime())
    const oldDay = this.state.today.getDate()
    date.setMonth(date.getMonth() - 1)
    const newDay = date.getDate()
    if (newDay !== oldDay) {
      date.setDate(1)
    }
    if (date.getHours() === 23) {
      date.setHours(24)
    } else if (date.getHours() === 1) {
      date.setHours(0)
    }
    this.setState({today: date});
    this.setState({end: date});
    this.setState({month_index: date.getMonth()});
    if (date.getMonth() == 0) {
      this.setState({last_month: 11});
    } else {
      this.setState({last_month: date.getMonth() - 1});
    }
    if (date.getMonth() == 11) {
      this.setState({next_month: 0});
    } else {
      this.setState({next_month: date.getMonth() + 1});
    }
  }
  addMonths() {
    console.log("in add month");
    var date = new Date(this.state.today.getTime())
    console.log(date.getMonth());
    const oldDay = this.state.today.getDate()
    date.setMonth(date.getMonth() + 1)
    console.log(date.getMonth());
    const newDay = date.getDate()
    if (newDay !== oldDay) {
      date.setDate(1)
    }
    if (date.getHours() === 23) {
      date.setHours(24)
    } else if (date.getHours() === 1) {
      date.setHours(0)
    }
    this.setState({today: date});
    this.setState({end: date});
    this.setState({month_index: date.getMonth()});
    if (date.getMonth() == 0) {
      this.setState({last_month: 11});
    } else {
      this.setState({last_month: date.getMonth() - 1});
    }
    if (date.getMonth() == 11) {
      this.setState({next_month: 0});
    } else {
      this.setState({next_month: date.getMonth() + 1});
    }
  }

  addDay(num) {
    var date = new Date(this.state.today.getTime())
    date.setDate(date.getDate() + num)
    return (date);
  }

  setDay(num) {
    var date = new Date(this.state.today.getTime())
    date.setDate(date.getDate() + num)
    if (this.state.today.getMonth() < date.getMonth()) {
      this.setState({month_index: date.getMonth()});
      if (date.getMonth() == 0) {
        this.setState({last_month: 11});
      } else {
        this.setState({last_month: date.getMonth() - 1});
      }
      if (date.getMonth() == 11) {
        this.setState({next_month: 0});
      } else {
        this.setState({next_month: date.getMonth() + 1});
      }
    } else if (this.state.today.getMonth() > date.getMonth()) {
      this.setState({month_index: date.getMonth()});
      if (date.getMonth() == 0) {
        this.setState({last_month: 11});
      } else {
        this.setState({last_month: date.getMonth() - 1});
      }
      if (date.getMonth() == 11) {
        this.setState({next_month: 0});
      } else {
        this.setState({next_month: date.getMonth() + 1});
      }
    }
    this.setState({today: date});
    this.setState({end: date});
  }

  render() {
    var day1 = this.addDay(-2);
    var day2 = this.addDay(-1);
    var day3 = this.addDay(1);
    var day4 = this.addDay(2);
    if (this.state.month_index < 0) {
      this.setState({month_index: this.state.today.getMonth()});
      if (this.state.today.getMonth() == 0) {
        this.setState({last_month: 11});
      } else {
        this.setState({last_month: this.state.today.getMonth() - 1});
      }
      if (this.state.today.getMonth() == 11) {
        this.setState({next_month: 0});
      } else {
        this.setState({next_month: this.state.today.getMonth() + 1});
      }
    }
    return (
      <View style={styles.container}>
        <Modal animationType="fade" transparent={true}
          visible={this.state.showModal} onRequestClose={() => this.setModal()}>
          <View style={styles.modalContainer}>
            <View style={styles.calendar}>
              <View style={styles.topHeader}>
                <View style={styles.topMonths}>
                  <TouchableOpacity onPress={() => this.remMonths()}>
                    <Text style={styles.month}>{global_months[this.state.last_month]} {(this.state.last_month == 11) ? this.state.today.getFullYear() - 1 : this.state.today.getFullYear()}</Text>
                  </TouchableOpacity>
                  <Text style={styles.monthSel}>{global_months[this.state.month_index]} {this.state.today.getFullYear()}</Text>
                  <TouchableOpacity onPress={() => this.addMonths()}>
                    <Text style={styles.month}>{global_months[this.state.next_month]} {(this.state.month_index == 11) ? this.state.today.getFullYear() + 1 : this.state.today.getFullYear()}</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.topMonths}>
                  <TouchableOpacity onPress={() => this.setDay(-2)}>
                    <View style={styles.date}>
                      <Text style={styles.dateName}>{global_day[day1.getDay()]}</Text>
                      <Text style={styles.dateNum}>{day1.getDate()}</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => this.setDay(-1)}>
                    <View style={styles.date}>
                      <Text style={styles.dateName}>{global_day[day2.getDay()]}</Text>
                      <Text style={styles.dateNum}>{day2.getDate()}</Text>
                    </View>
                  </TouchableOpacity>
                  <View style={styles.dateSel}>
                    <Text style={styles.dateNameSel}>{global_day[this.state.today.getDay()]}</Text>
                    <Text style={styles.dateNumSel}>{this.state.today.getDate()}</Text>
                  </View>
                  <TouchableOpacity onPress={() => this.setDay(1)}>
                    <View style={styles.date}>
                      <Text style={styles.dateName}>{global_day[day3.getDay()]}</Text>
                      <Text style={styles.dateNum}>{day3.getDate()}</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => this.setDay(2)}>
                    <View style={styles.date}>
                      <Text style={styles.dateName}>{global_day[day4.getDay()]}</Text>
                      <Text style={styles.dateNum}>{day4.getDate()}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.timeContainer}>
                <Text style={styles.header}>Heure de début</Text>
                <View style={styles.timeSelector}>
                  <ScrollView horizontal={true}>
                    {hours.map((item, key) => {
                      if (key == this.state.start_time) {
                        return (
                          <TouchableOpacity onPress={() => this.setStartTime(key)}>
                            <Text style={styles.hourSel}>{item}</Text>
                          </TouchableOpacity>
                        );
                      } else {
                        return (
                          <TouchableOpacity onPress={() => this.setStartTime(key)}>
                            <Text style={styles.hours}>{item}</Text>
                          </TouchableOpacity>
                        );
                      }
                    })}
                  </ScrollView>
                </View>
                <View style={styles.separator}></View>
                <Text style={styles.header}>Heure de fin</Text>
                <View style={styles.timeSelector}>
                  <ScrollView horizontal={true}>
                    {hours.map((item, key) => {
                      if (key == this.state.end_time) {
                        return (
                          <TouchableOpacity onPress={() => this.setEndTime(key)}>
                            <Text style={styles.hourSel}>{item}</Text>
                          </TouchableOpacity>
                        );
                      } else {
                        return (
                          <TouchableOpacity onPress={() => this.setEndTime(key)}>
                            <Text style={styles.hours}>{item}</Text>
                          </TouchableOpacity>
                        );
                      }
                    })}
                  </ScrollView>
                </View>
              </View>
              <TextButtonCE text={"VALIDER"} run={() => this.createDate()} />
            </View>
          </View>
        </Modal>
      { (this.state.setDate == true) ? 
        <View style={styles.dispBtn}>
          <Text style={styles.dispBtnText}>{global_day[this.state.today.getDay()]} {this.state.today.getDate()}
          {global_months[this.state.month_index]} de {hours[this.state.start_time]} a {hours[this.state.end_time]}</Text>
          <TouchableOpacity style={styles.button} onPress={() => this.setModal()}>
            <Text style={styles.button_text}>MODIFIER</Text>
          </TouchableOpacity>
        </View>
      :
        <TouchableOpacity style={styles.button} onPress={() => this.setModal()}>
          <Text style={styles.button_text}>PLANNIFIER</Text>
        </TouchableOpacity>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  dispBtn: {
    flexDirection: "row",
    alignItems: 'center',
  },
  dispBtnText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: "200",
    fontSize: 15,
    marginRight: 15,
    color: '#4F4F4F',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1c1c1ca2',
  },
  timeContainer: {
    alignItems: 'flex-start',
    flexDirection: "column",
    paddingTop: 10,
    paddingRight: 10,
    paddingLeft: 10,
  },
  timeSelector: {
    flexDirection: "row",
  },
  separator: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#969696',
    marginTop: 20,
    marginBottom: 20,
  },
  calendar: {
    backgroundColor: '#fff',
    borderRadius: 10,
    width: '90%',
    height: '60%',
  },
  topHeader: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    backgroundColor: '#361979',
    width: '100%',
    height: '30%',
  },
  header: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: "400",
    fontSize: 20,
    marginBottom: 15,
    color: '#4F4F4F',
    textAlign: 'center',
  },
  month: {
    fontFamily: 'Roboto',
    fontStyle: 'italic',
    fontWeight: "700",
    fontSize: 20,
    color: '#fff',
  },
  topMonths: {
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'center',
  },
  monthSel: {
    fontFamily: 'Roboto',
    fontStyle: 'italic',
    marginRight: 20,
    marginLeft: 20,
    borderBottomWidth: 2,
    borderColor: "#fff",
    fontWeight: "300",
    fontSize: 20,
    color: '#fff',
  },
  hours: {
    fontFamily: 'Roboto',
    fontStyle: 'italic',
    marginRight: 20,
    marginLeft: 20,
    fontWeight: "300",
    fontSize: 20,
    color: '#6C2BA1',
  },
  hourSel: {
    fontFamily: 'Roboto',
    fontStyle: 'italic',
    marginRight: 20,
    marginLeft: 20,
    fontWeight: "700",
    fontSize: 20,
    color: '#6C2BA1',
    borderColor: '#6C2BA1',
    borderBottomWidth: 3,
  },
  button: {
    borderColor: '#6C2BA1',
    borderWidth: 1,
    borderRadius: 15,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 30,
    paddingLeft: 30,
  },
  button_text: {
    fontFamily: 'Roboto',
    fontStyle: 'italic',
    fontWeight: "bold",
    fontSize: 15,
    color: '#6C2BA1',
    textAlign: 'center',
  },
  date: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  dateName: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    marginRight: 20,
    marginLeft: 20,
    fontWeight: "200",
    fontSize: 15,
    color: '#fff',
  },
  dateNum: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    marginRight: 20,
    marginLeft: 20,
    fontWeight: "700",
    fontSize: 15,
    color: '#fff',
  },
  dateSel: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 20,
  },
  dateNameSel: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    marginRight: 5,
    marginLeft: 5,
    fontWeight: "200",
    fontSize: 15,
    color: '#361979',
  },
  dateNumSel: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    marginRight: 5,
    marginLeft: 5,
    fontWeight: "700",
    fontSize: 15,
    color: '#361979',
  }
});
