import React, { Component } from "react";
import data from "../data/data";
import { Container, Row, Table, Form, Col } from "react-bootstrap";
import Action from "./action";
import Delselect from "./Delreset";

import { FaSort } from "react-icons/fa";
class TableData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emp_list: data,
      serch_item: data,
      selectedList: [],
      isActive: true,
      isSorted: true,
      status: false,
      rowKey: null,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.searchItem = this.searchItem.bind(this);
    this.InputChange = this.InputChange.bind(this);
    this.PriceSort = this.PriceSort.bind(this);
    this.saveChnage = this.saveChnage.bind(this);
  }
  saveChnage(event) {
    let data = event.target.value;
    let key = event.target.name;
    let list = [...this.state.emp_list];
    let index = list.findIndex((x) => x.EMP_ID == key);
    //console.log(index);
    list[index].EMAIL_ID = data;
    //console.log(list);
    //
    this.setState({
      emp_list: [...list],
      serch_item: [...list],
    });
    // alert(key);
  }
  PriceSort(event) {
    if (this.state.isSorted) {
      let sortedData = this.state.emp_list.sort((a, b) => {
        let first = a.EMAIL_ID.toLowerCase();
        let second = b.EMAIL_ID.toLowerCase();

        if (first < second) {
          return -1;
        } else {
          return 1;
        }
      });
      this.setState({
        isSorted: !this.state.isSorted,
        emp_list: [...sortedData],
      });
      // console.log(sortedData);
    } else {
      let sortedData = this.state.emp_list.sort((a, b) => {
        let first = a.EMAIL_ID.toLowerCase();
        let second = b.EMAIL_ID.toLowerCase();

        if (first < second) {
          return 1;
        } else {
          return -1;
        }
      });
      this.setState({
        isSorted: !this.state.isSorted,
        emp_list: [...sortedData],
      });
      //console.log(sortedData);
    }
    //console.log(sortedData);
    // alert(event.target);
  }
  /**Input Change value price */
  InputChange(e, key) {
    // alert(event.target);
    //alert("Hell");

    let preKey = this.state.rowKey;
    if (key !== preKey) {
      this.setState({
        rowKey: key,
        status: true,
      });
    } else {
    }
  }
  /*** Search Item methods */
  searchItem(event) {
    let data = event.target.value;

    const list = this.state.serch_item.filter(
      (obj) =>
        Object.values(obj).some((val) =>
          val.toString().toLowerCase().includes(data.toLowerCase())
        )
      //
    );

    this.setState({
      emp_list: [...list],
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    let deldata = [...this.state.selectedList];
    let list = [...this.state.emp_list];

    let data = [];

    list.forEach((item) => {
      let status = deldata.indexOf(item.EMP_ID.toString());
      if (status > -1) {
        //list.splice(status, 1);
      } else {
        data.push(item);
      }
    });

    this.setState({
      emp_list: [...data],
      serch_item: [...data],
      selectedList: [],
    });
  }
  handleInputChange(event) {
    let id = event.target.value;
    //event.target.style.backgroundColor = "red";
    console.log(event.target);
    this.setState({
      rowKey: null,
      status: false,
    });
    let status = this.state.selectedList.indexOf(id);
    if (status > -1) {
      let data = [...this.state.selectedList];
      data.splice(status, 1);
      this.setState({
        selectedList: [...data],
      });
      // alert(data);
    } else {
      let data = [...this.state.selectedList];
      data.push(id);
      this.setState({
        selectedList: [...data],
      });
    }
  }
  render() {
    const data_list = this.state.emp_list.map((raw, index) => {
      return (
        <tr
          key={raw.EMP_ID}
          value={raw.EMP_ID}
          onClick={this.handleInputChange}
        >
          <td>
            <Form.Check value={raw.EMP_ID} type="checkbox" />
          </td>
          <td> {index}</td>
          <td> {raw.EMP_NAME}</td>
          <td
            onClick={(e) => this.InputChange(e, raw.EMP_ID)}
            value={raw.EMP_ID}
          >
            {this.state.status && this.state.rowKey === raw.EMP_ID ? (
              <input
                value={raw.EMAIL_ID}
                name={raw.EMP_ID}
                onChange={this.saveChnage}
              />
            ) : (
              raw.EMAIL_ID
            )}
          </td>
          <td> {raw.EMP_NAME}</td>
          <td> {raw.EMP_NAME}</td>
        </tr>
      );
    });
    return (
      <Container className="mt-4">
        <Action />
        <Form onSubmit={this.handleSubmit}>
          <Row className="mt-2">
            <Table striped bordered responsive="sm">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Id</th>
                  <th>
                    Name{" "}
                    <Form.Control
                      onChange={this.searchItem}
                      type="text"
                      placeholder="Item No"
                    />
                  </th>
                  <th onClick={this.PriceSort}>
                    Price <FaSort />
                  </th>

                  <th>Coupon</th>
                  <th>In Stock</th>
                </tr>
              </thead>
              <tbody>{data_list}</tbody>
            </Table>
          </Row>
          <Row>
            <Col md={{ span: 3, offset: 2 }}>
              <Delselect value="Delete" type="submit" />
            </Col>
            <Col>
              <Delselect
                value="Reset"
                type="reset"
                onClick={(event) => event.target.reset()}
              />
            </Col>
          </Row>
        </Form>
      </Container>
    );
  }
}

export default TableData;
