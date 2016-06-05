var Geo = React.createClass({

  // sets initial state
  getInitialState: function(){
    return { items: ' ', };
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
      type: "GET"
    }).done(
      function (result) {
        var lastGist = result[0];
        this.setState({
          items: lastGist.items
    })
    }.bind(this));
  },

  componentWillUnmount: function() {
    this.serverRequest.abort();
  },

  render: function() {
    var geos = this.props;
    console.log(geos);

    return (
      <div>
        <ul>
        </ul>
      </div>
    )
  }

});

ReactDOM.render(
  <Geo source="/geos" />,
  document.getElementById('main')
);