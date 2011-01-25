Workr.statechart = Ki.Statechart.create({

  rootState: Ki.State.design({

    initialSubstate: 'loadingBundles',

    loadingBundles: Ki.State.design({

      enterState: function() {
        var self = this ;
/*      Login not complete. Dont load
        SC.loadBundle('login', function() {
          self.gotoState('loggedOut');
        });
*/

        var store = FamilyTree.get('store');
        var fc = FamilyTree.familiesController.set('content', store.find(FamilyTree.Family));
        FamilyTree.familiesController.set('selection', fc.get('content').objectAt(1));
        self.gotoState('studio');

      }

    }),

    studio: Ki.State.design({
      initialSubstate:        'root',

      root: Ki.State.design(),

      enterState: function() {
        Workr.mainPage.get('mainPane').append();
        /*
          I have to set the z-index on canvas so it renders behind things, but then cant access user behavior on canvas (e.g. mouseDown).
        */
        Workr.mainPage.get('mainPane').appendChild( FamilyTree.CanvasView.create() );
      },

      openAppMenu: function(){
        this.gotoState('appMenu');
      },

      openLibMenu: function(){
        this.gotoState('libMenu');
      },

      openPropMenu: function(){
        this.gotoState('propMenu');
      },

      closeMenus: function(){
        this.gotoState('root');
      },

      libMenu: Ki.State.design({
        enterState: function(){
          console.log(this.name);
        }
      }),

      propMenu: Ki.State.design({
        enterState: function(){
          console.log(this.name);
        }
      }),

      appMenu: Ki.State.design({
        initialSubstate: 'appMenuOpen',

        appMenuOpen: Ki.State.design(),

        enterState: function() {
          Workr.getPath('mainPage.mainPane.appMenu').set('isOpen', YES);
        },

        exitState: function() {
          Workr.getPath('mainPage.mainPane.appMenu').set('isOpen', NO);
        },


        openAppMenuSearching: function(){
          this.gotoState('searching');
        },

        searching: Ki.State.design({
          enterState: function(){
            Workr.getPath('mainPage.mainPane.appMenu').set('isSearching', YES);
          },

          exitState: function(){
            Workr.getPath('mainPage.mainPane.appMenu').set('isSearching', NO);
          }

        })

      })
    }),


    loggedOut: Ki.State.design({

      enterState: function() {
        Workr.getPath('loginPage.loginPane').append();
      },

      exitState: function() {
        Workr.getPath('loginPage.loginPane').remove();
      },

      logIn: function() {
        Workr.loginController.action('logIn')
      },

      loginSuccess: function(){
        this.gotoState('loggedIn');
      },

      loginFailure: function(a,b,c){
        errorMessage = 'Could not login.. Need to pass a param here to find out why. yell at Brian';
        Workr.loginController.set('loginErrorMessage', errorMessage);
        console.log('We need a login failure state',a,b,c);
      }

    }),

    loggedIn: Ki.State.design({
      initialSubstate:        'main',

      main: Ki.State.design({
        initialSubstate: "ready",
        ready: Ki.State.design({
          enterState: function() {
            Workr.getPath('mainPage.mainPane').append();
          },

          exitState: function() {
            Workr.getPath('mainPage.mainPane').remove();
          },

          logOut: function() {
            this.gotoState('loggedOut');
          }

        })
      })


    })

  })  // rootState

})