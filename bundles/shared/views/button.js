ButtonView = SC.View.extend({
  
  state: null,
  
  init: function() {
    sc_super();
    this.goTransient();
  },
  
  goTransient: function() {
    // check the position of the mouse
    this.state = 'transient' ;
    console.log(this.state);
    this.goMouseOutMouseUp() ;
  },
  
  goMouseOutMouseUp: function() {
    this.state = 'mouseOutMouseUp' ;
    console.log(this.state);
    // we're in point 1 or point 2 -- no rendering
    this.displayDidChange(); // triggers a re-render
  },
  
  goMouseOverMouseUp: function() {
    this.state = 'mouseOverMouseUp' ;
    console.log(this.state);
    // we're in point 1 or point 2 -- no rendering
    this.displayDidChange(); // triggers a re-render
  },
  
  goMouseOverMouseDown: function() {
    this.state = 'mouseOverMouseDown' ;
    console.log(this.state);
    // we're in point 1 or point 2 -- no rendering
    this.displayDidChange(); // triggers a re-render
  },
  
  goMouseOutMouseDown: function() {
    this.state = 'mouseOutMouseDown' ;
    console.log(this.state);
    // we're in point 1 or point 2 -- no rendering
    this.displayDidChange(); // triggers a re-render
  },
  
  goMouseOverJustClicked: function() {
    this.state = 'mouseOverJustClicked' ;
    console.log(this.state);
    // we're in point 1 or point 2 -- no rendering
    this.displayDidChange(); // triggers a re-render
  },
  
  mouseEntered: function(evt) {
    var state = this.state ;
    if (state == 'mouseOutMouseUp') {
      // action here?
      // animation parameters -- adjust CSS?
      this.goMouseOverMouseUp();
    } else if (state == 'mouseOutMouseDown') {
      // action here?
      // animation parameters
      this.goMouseOverMouseDown();
    }
  },
  
  mouseExited: function(evt) {
    var state = this.state ;
    if (state == 'mouseOverMouseUp') {
      // action here?
      // animation parameters -- adjust CSS?
      this.goMouseOutMouseUp();
    } else if (state == 'mouseOverMouseDown') {
      // action here?
      // animation parameters
      this.goMouseOutMouseDown();
    }
  },
  
  mouseDown: function(evt) {
    var state = this.state ;
    if (state == 'mouseOverMouseUp') {
      // action here?
      // animation parameters -- adjust CSS?
      this.goMouseOverMouseDown();
      return YES; // mandatory -- tells SC that we want the mouse modal loop
    }
  },
  
  mouseUp: function(evt) {
    var state = this.state ;
    if (state == 'mouseOverMouseDown') {
      Workr.action();
      // animation parameters -- adjust CSS?
      this.goMouseOverJustClicked();
    } else if (state == 'mouseOutMouseDown') {
      // action here?
      // animation parameters
      this.goMouseOutMouseUp();
    }
  },
  
  mouseMoved: function(evt) {
    var state = this.state ;
    if (state == 'mouseOverJustClicked') {
      // action here?
      // animation parameters -- adjust CSS?
      this.goMouseOverMouseDown();
    }
  },
  
  render: function(context, firstTime) {
    if (firstTime) context.push('Click Me');
    
    var state = this.state;
    switch (state) {
      case 'mouseOutMouseUp': context.removeClass('hover'); break;
      case 'mouseOverMouseUp': context.addClass('hover'); break;
      case 'mouseOverMouseDown': context.addClass('hover'); break;
      case 'mouseOutMouseDown': context.removeClass('hover'); break;
      case 'mouseOverJustClicked': context.removeClass('hover'); break;
    }
  }
  
});