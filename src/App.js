import React, { Component, Fragment } from "react";
import "./App.css";
import firebase from "./firebase.js";
import logo from "./skillbox.png";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Description: "",
      DescriptionC: "",
      customAct: [],
      Category: "",
      Level: "",
      Source: "",
      Time: "",
      Step: "",
      addCustom: "",
      custom: "",
      initial: "",
      currentLevel: "",
      finished: "",
      start: "",
      random: "",
      step: "",
      trainingSubject: "",
      hasDescription: false,
      inputOptions: [],
      Activities: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleInitial = this.handleInitial.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  handleSelect(e) {
    e.preventDefault();
    const selectRef = firebase.database().ref("inputOptions");
    const select = {
      currentLevel: this.state.currentLevel,
      trainingSubject: this.state.trainingSubject,
      initial: this.state.initial,
    };
    selectRef.update(select);
    this.setState({
      currentLevel: "",
      trainingSubject: "",
      initial: "no",
    });
  }
  handleInitial(e) {
    e.preventDefault();
    const initialRef = firebase.database().ref("inputOptions");
    const initial = {
      initial: this.state.initial
    };
    initialRef.update(initial);
    this.setState({
      initial: "yes"
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    const itemsRef = firebase.database().ref("Activities");
    const item = {
      Description: this.state.Description,
      Category: this.state.Category,
      Level: this.state.Level,
      Source: this.state.Source,
      Time: this.state.Time,
      Step: parseInt(this.state.Step)
    };
    itemsRef.push(item);
    this.setState({
      Description: "",
      Category: "",
      Level: "",
      Source: "",
      Time: "",
      Step:"",
    });
  }


  componentDidMount() {
    const randDescr = firebase.database().ref("randomAct/DescriptionR");
    randDescr.on("value", snapshot => {
      const rDesc = snapshot.val();
      this.setState({ rDesc: rDesc });
    });
    const stepOptions = firebase.database().ref("inputOptions/step");
    stepOptions.on("value", snapshot => {
      const currentStep = snapshot.val();
      this.setState({ currentStep: currentStep });
    });
    const exportRandom = firebase.database().ref("inputOptions/random");
    exportRandom.on("value", snapshot => {
      const Random = snapshot.val();
      this.setState({ Random: Random });
    });
    const showObject = firebase.database().ref("inputOptions/trainingSubject");
    showObject.on("value", snapshot => {
      const showSubject = snapshot.val();
      this.setState({ showSubject: showSubject });
    });
    const showLevel = firebase.database().ref("inputOptions/currentLevel");
    showLevel.on("value", snapshot => {
      const showTheLevel = snapshot.val();
      this.setState({ showTheLevel: showTheLevel });
    });
    const itemsRef = firebase.database().ref("Activities");
    const selectRef = firebase.database().ref("inputOptions");
    itemsRef.on("value", snapshot => {
      let Activities = snapshot.val();
      let newState = [];
      for (let item in Activities) {
        newState.push({
          id: item,
          Description: Activities[item].Description,
          Category: Activities[item].Category,
          Level: Activities[item].Level,
          Source: Activities[item].Source,
          Time: Activities[item].Time,
          Step: Activities[item].Step
        });
      }
      this.setState({
        Activities: newState
      });
    });

    selectRef.on("value", snapshot => {
      let inputOptions = snapshot.val();
      let newState = [];
      newState.push({
        currentLevel: inputOptions.currentLevel,
        finished: inputOptions.finished,
        initial: inputOptions.initial,
        start: inputOptions.start,
        trainingSubject: inputOptions.trainingSubject
      });
      this.setState({
        inputOptions: newState,
        trainingSubject: inputOptions.trainingSubject
      });
    });
  }

  componentDidUpdate() {
    const actDone = firebase.database().ref("inputOptions/done");
    const actNotUse = firebase.database().ref("inputOptions/notUse");
    const exportRandom = firebase.database().ref("inputOptions/random");
    const descriptionRef = firebase.database().ref("Activities");
    let random = "";
    let done = "";
    let notUse = "";
    actNotUse.on("value", snapshot => {
      notUse = snapshot.val();
    });
    actDone.on("value", snapshot => {
      done = snapshot.val();
    });

    let descriptions = [];
    exportRandom.on("value", snapshot => {
      random = snapshot.val();
    });

    descriptionRef.on("value", snapshot => {
      let activities = snapshot.val();
      for (var key in activities) {
        if (activities.hasOwnProperty(key)) {
          descriptions.push(activities[key].Description);

          if (done === "yes") {
            const inputRef = firebase.database().ref("inputOptions");
            if (this.state.rDesc === activities[key].Description) {
              console.log("test");
              const itemRef = firebase.database().ref(`/Activities/${key}`);
              itemRef.update({Step: 9});
              inputRef.update({done: "no"});
              
            }
          }
          if (notUse === "yes") {
            const inputRef = firebase.database().ref("inputOptions");
            if (this.state.rDesc === activities[key].Description) {
              console.log("test");
              const itemRef = firebase.database().ref(`/Activities/${key}`);
              itemRef.update({Step: 0});
              inputRef.update({notUse: "no"});
            }
          }
        }
        if (random === "yes") {

            if (activities[key].Step === this.state.currentStep){
              let description =
              descriptions[Math.floor(Math.random() * descriptions.length)];
              console.log(this.state.currentStep);
          const randomActRefDescription = firebase.database().ref("randomAct");
          const inputRef = firebase.database().ref("inputOptions");
          randomActRefDescription.update({
            DescriptionR: description
          });
          inputRef.update({
            random: "no"
          });}
        }
      }
    });

   
  }

  removeItem(itemId) {
    const itemRef = firebase.database().ref().child(`/Activities/${itemId}/Step`);

    itemRef.set(0);
  }

  render() {
    return (
      <div className="app">
        <header>
          <div className="wrapper">
            <img id = "logo"src={logo} width="60px" />
          </div>
        </header>
        <div className="container">
          {this.state.inputOptions.map(item => {
            if (item.initial == "no") {
              return (
                <section className="add-item">
                  <form onSubmit={this.handleSubmit}>
                    <h3 class="title">Add a custom activity if you want</h3>
                    <select class = "select"
                      name="Category"
                      onChange={this.handleChange}
                      value={this.state.Category}
                    >
                      <option value="">select the category</option>
                      <option value="3d-modeling">
                        3d modeling in 3ds max
                      </option>
                      <option value="leadership">Leadership</option>
                    </select>
                    <input class = "select"
                      type="text"
                      name="Description"
                      placeholder="Describe the activity"
                      onChange={this.handleChange}
                      value={this.state.Description}
                    />
                    <select class = "select"
                      name="Level"
                      onChange={this.handleChange}
                      value={this.state.Level}
                    >
                      <option value="">Select your level</option>
                      <option value="beginner    ">beginner</option>
                      <option value="intermediate">intermediate</option>
                      <option value="advanced">advanced</option>
                    </select>

                    <select class = "select"
                    type = "number"
                      name="Step"
                      onChange={this.handleChange}
                      value={parseInt(this.state.Step)}
                    >
                      <option value="">Select the step</option>
                      <option value={1}>1</option>
                      <option value={2}>2</option>
                      <option value={3}>3</option>
                      <option value={4}>4</option>
                      <option value={5}>5</option>
                      <option value={6}>6</option>
                      <option value={7}>7</option>
                      <option value={8}>8</option>
                    </select>

                    <input class = "select"
                      type="text"
                      name="Source"
                      placeholder="Where can you find the resources?"
                      onChange={this.handleChange}
                      value={this.state.Source}
                    />
                    <input class = "select"
                      type="text"
                      name="Time"
                      placeholder="How long will the activity take?"
                      onChange={this.handleChange}
                      value={this.state.Time}
                    />
                    <button class="button1">Add Item</button>
                  </form>
                  <form onSubmit={this.handleInitial}>
                    <button
                      class="button1"
                      name="initial"
                      onClick={this.handleChange}
                      value="yes"
                    >
                      Start new learning goal
                    </button>
                  </form>
                </section>
              );
            }
          })}
          {this.state.inputOptions.map(item => {
            if (item.initial == "yes") {
              return (
                <section className="add-item">
                  <h3 class="title">Select your learning goal</h3>
                  <form onSubmit={this.handleSelect}>
                    <select
                      name="trainingSubject"
                      onChange={this.handleChange}
                      value={this.state.trainingSubject}
                    >
                      <option value="">select your learning goal</option>
                      <option value="3d-modeling">
                        3d modeling in 3ds max
                      </option>
                      <option value="leadership">Leadership</option>
                    </select>
                    <select
                      name="currentLevel"
                      onChange={this.handleChange}
                      value={this.state.currentLevel}
                    >
                      <option value="">Select your level</option>
                      <option value="beginner    ">beginner</option>
                      <option value="intermediate">intermediate</option>
                      <option value="advanced">advanced</option>
                    </select>
                    <button
                      class="button1"
                      name="initial"
                      onClick={this.handleChange}
                      value="no"
                    >
                      Submit
                    </button>
                  </form>
                </section>
              );
            }
          })}

          <section className="display-item">
            <div className="wrapper">
              <h3>step 1 options</h3>
              <ul>
                {this.state.Activities.map(item => {
                  if (
                    item.Category == this.state.showSubject &&
                    item.Level == this.state.showTheLevel&&
                    item.Step == 1
                  ) {
                    return (
                      <div className="display-item">
                        <li key={item.id}>
                          <h4>{item.Description}</h4>
                          <p>category: {item.Category}</p>
                          <p>level: {item.Level}</p>
                          <p>step: {item.Step}</p>
                          <p>
                            required time: {item.Time}
                            <br></br>
                            <br></br>
                            <a class="button2" href={item.Source} target="_blank">
                              Visit training
                            </a>
                            <a
                              class="buttonRemove"
                              onClick={() => this.removeItem(item.id)}
                            >
                              Remove Item
                            </a>
                          </p>
                        </li>
                      </div>
                    );
                  }
                })}
              </ul>
            </div>
            <div className="wrapper">
              <h3>step 2 options</h3>
              <ul>
                {this.state.Activities.map(item => {
                  if (
                    item.Category == this.state.showSubject &&
                    item.Level == this.state.showTheLevel&&
                    item.Step == 2
                  ) {
                    return (
                      <div className="display-item">
                        <li key={item.id}>
                          <h4>{item.Description}</h4>
                          <p>category: {item.Category}</p>
                          <p>level: {item.Level}</p>
                          <p>step: {item.Step}</p>
                          <p>
                            required time: {item.Time}
                            <br></br>
                            <br></br>
                            <a class="button2" href={item.Source} target="_blank">
                            Visit training
                            </a>
                            <a
                              class="buttonRemove"
                              onClick={() => this.removeItem(item.id)}
                            >
                              Remove Item
                            </a>
                          </p>
                        </li>
                      </div>
                    );
                  }
                })}
              </ul>
            </div>
            <div className="wrapper">
              <h3>step 3 options</h3>
              <ul>
                {this.state.Activities.map(item => {
                  if (
                    item.Category == this.state.showSubject &&
                    item.Level == this.state.showTheLevel&&
                    item.Step == 3
                  ) {
                    return (
                      <div className="display-item">
                        <li key={item.id}>
                          <h4>{item.Description}</h4>
                          <p>category: {item.Category}</p>
                          <p>level: {item.Level}</p>
                          <p>step: {item.Step}</p>
                          <p>
                            required time: {item.Time}
                            <br></br>
                            <br></br>
                            <a class="button2" href={item.Source} target="_blank">
                            Visit training
                            </a>
                            <a
                              class="buttonRemove"
                              onClick={() => this.removeItem(item.id)}
                            >
                              Remove Item
                            </a>
                          </p>
                        </li>
                      </div>
                    );
                  }
                })}
              </ul>
            </div>
            <div className="wrapper">
              <h3>step 4 options</h3>
              <ul>
                {this.state.Activities.map(item => {
                  if (
                    item.Category == this.state.showSubject &&
                    item.Level == this.state.showTheLevel&&
                    item.Step == 4
                  ) {
                    return (
                      <div className="display-item">
                        <li key={item.id}>
                          <h4>{item.Description}</h4>
                          <p>category: {item.Category}</p>
                          <p>level: {item.Level}</p>
                          <p>step: {item.Step}</p>
                          <p>
                            required time: {item.Time}
                            <br></br>
                            <br></br>
                            <a class="button2" href={item.Source} target="_blank">
                            Visit training
                            </a>
                            <a
                              class="buttonRemove"
                              onClick={() => this.removeItem(item.id)}
                            >
                              Remove Item
                            </a>
                          </p>
                        </li>
                      </div>
                    );
                  }
                })}
              </ul>
            </div>
            <div className="wrapper">
              <h3>step 5 options</h3>
              <ul>
                {this.state.Activities.map(item => {
                  if (
                    item.Category == this.state.showSubject &&
                    item.Level == this.state.showTheLevel&&
                    item.Step == 5
                  ) {
                    return (
                      <div className="display-item">
                        <li key={item.id}>
                          <h4>{item.Description}</h4>
                          <p>category: {item.Category}</p>
                          <p>level: {item.Level}</p>
                          <p>step: {item.Step}</p>
                          <p>
                            required time: {item.Time}
                            <br></br>
                            <br></br>
                            <a class="button2" href={item.Source} target="_blank">
                            Visit training
                            </a>
                            <a
                              class="buttonRemove"
                              onClick={() => this.removeItem(item.id)}
                            >
                              Remove Item
                            </a>
                          </p>
                        </li>
                      </div>
                    );
                  }
                })}
              </ul>
            </div>
            <div className="wrapper">
              <h3>step 6 options</h3>
              <ul>
                {this.state.Activities.map(item => {
                  if (
                    item.Category == this.state.showSubject &&
                    item.Level == this.state.showTheLevel&&
                    item.Step == 6
                  ) {
                    return (
                      <div className="display-item">
                        <li key={item.id}>
                          <h4>{item.Description}</h4>
                          <p>category: {item.Category}</p>
                          <p>level: {item.Level}</p>
                          <p>step: {item.Step}</p>
                          <p>
                            required time: {item.Time}
                            <br></br>
                            <br></br>
                            <a class="button2" href={item.Source} target="_blank">
                            Visit training
                            </a>
                            <a
                              class="buttonRemove"
                              onClick={() => this.removeItem(item.id)}
                            >
                              Remove Item
                            </a>
                          </p>
                        </li>
                      </div>
                    );
                  }
                })}
              </ul>
            </div>
            <div className="wrapper">
              <h3>step 7 options</h3>
              <ul>
                {this.state.Activities.map(item => {
                  if (
                    item.Category == this.state.showSubject &&
                    item.Level == this.state.showTheLevel&&
                    item.Step == 7
                  ) {
                    return (
                      <div className="display-item">
                        <li key={item.id}>
                          <h4>{item.Description}</h4>
                          <p>category: {item.Category}</p>
                          <p>level: {item.Level}</p>
                          <p>step: {item.Step}</p>
                          <p>
                            required time: {item.Time}
                            <br></br>
                            <br></br>
                            <a class="button2" href={item.Source} target="_blank">
                            Visit training
                            </a>
                            <a
                              class="buttonRemove"
                              onClick={() => this.removeItem(item.id)}
                            >
                              Remove Item
                            </a>
                          </p>
                        </li>
                      </div>
                    );
                  }
                })}
              </ul>
            </div>
            <div className="wrapper">
              <h3>step 8 options</h3>
              <ul>
                {this.state.Activities.map(item => {
                  if (
                    item.Category == this.state.showSubject &&
                    item.Level == this.state.showTheLevel&&
                    item.Step == 8
                  ) {
                    return (
                      <div className="display-item">
                        <li key={item.id}>
                          <h4>{item.Description}</h4>
                          <p>category: {item.Category}</p>
                          <p>level: {item.Level}</p>
                          <p>step: {item.Step}</p>
                          <p>
                            required time: {item.Time}
                            <br></br>
                            <br></br>
                            <a class="button2" href={item.Source} target="_blank">
                            Visit training
                            </a>
                            <a
                              class="buttonRemove"
                              onClick={() => this.removeItem(item.id)}
                            >
                              Remove Item
                            </a>
                          </p>
                        </li>
                      </div>
                    );
                  }
                })}
              </ul>
            </div>
            <div className="wrapper">
              <h3>Finished items</h3>
              <ul>
                {this.state.Activities.map(item => {
                  if (
                    item.Category == this.state.showSubject &&
                    item.Step == 9
                  ) {
                    return (
                      <div className="display-item">
                        <li key={item.id}>
                          <h4>{item.Description}</h4>
                          <p>category: {item.Category}</p>
                        </li>
                      </div>
                    );
                  }
                })}
              </ul>
            </div>

            <div className="wrapper">
              <h3>Removed items</h3>
              <ul>
                {this.state.Activities.map(item => {
                  if (
                    item.Category == this.state.showSubject &&
                    item.Step == 0
                  ) {
                    return (
                      <div className="display-item">
                        <li key={item.id}>
                          <h4>{item.Description}</h4>
                          <p>category: {item.Category}</p>
                        </li>
                      </div>
                    );
                  }
                })}
              </ul>
            </div>
          </section>
        </div>
      </div>
    );
  }
}
export default App;
