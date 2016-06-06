var Geo = React.createClass({

  // sets initial state
  getInitialState: function(){
    return { json: "", };
  },

  // sets state, triggers render method
  handleChange: function(event){
    // grab value form input box
    this.setState({searchString:event.target.value});
    console.log("scope updated!");
  },

  componentDidMount: function() {
    this.serverRequest = $.ajax({
      url: this.props.source,
      type: "GET",
      dataType: 'json'
    }).done(
      function (result) {
        this.setState({ json: result, endpoint: this.props.source })
    }.bind(this));
  },

  componentWillUnmount: function() {
    this.serverRequest.abort();
  },

  render: function() {
    // debugger;
    // console.log('Json: ' + JSON.stringify(this.state.json));
    // console.log('Endpoint: ' + this.state.endpoint);

    function display_geo_data(geo_data) {
        var string = "Name: ";
        if (geo_data.json == "") {
          return geo_data;
        } else {
          for (let key in geo_data) {
            if (!geo_data.hasOwnProperty(key)) { continue; }
            string += geo_data[key].display;
          }
          return string;
        }
    };

    return (
      <div>
        <p>{display_geo_data(this.state.json)}</p>
      </div>
    )
  }

});


ReactDOM.render(
  <Geo source="/geos" />,
  document.getElementById('main')
);