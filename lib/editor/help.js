import introJs from 'intro.js'

export function runIntro() {
  introJs().setOptions({
    steps: [
    {
      element: document.querySelector('[data-id="logo"]'),
      title: 'Welcome!!',
      intro: 'You are using TryYourIdeas Components Editor! Let\' quickly see how to use it. First there is a Default project that is created automatically to start off creating components.',
      //position: 'right'
    },
    {
      element: document.querySelector('[data-id="newComponent"]'),
      intro: 'By clicking on this button, you can start adding a new component to your project. A component is composed by visual items, properties and events, which can be modified in this section.',
      //position: 'left'
    },
    {
      element: document.querySelector('[data-id="generateCode"]'),
      intro: 'And with this button you can generate your VueJS project code. An email will be sent to the address you provided with a download link and instructions for how to test it.',
     // position: 'top'
    },
    {
      element: document.querySelector('[data-id="reportIssues"]'),
      intro: 'You can use this button for reporting any issue you might find working with the editor, or request a new feature. We are glad to help.',
     // position: 'top'
    },
    {
      element: document.querySelector('[data-id="deviceSelector"]'),
      intro: 'With the device selector you can customize your designs for different devices.',
     // position: 'top'
    },
    {
      element: document.querySelector('[data-id="modeSelector"]'),
      intro: 'Also, you can create custom design for both Dark and Light mode.',
     // position: 'top'
    },
    // {
    //   element: document.querySelector('[data-id="itemList"]'),
    //   intro: 'This is the list of the component items. You can add new items like div, buttons, or other components already created in the project.',
    //   //position: 'bottom'
    // },
    // {
    //   element: document.querySelector('[data-id="propertyList"]'),
    //   intro: 'This is the list of the component properties. You can use these properties to pass in values to the component that can be shown in some component items.',
    //   //position: 'bottom'
    // },
    {
      element: document.querySelector('[data-id="itemProperties"]'),
      intro: 'Here you can edit the properties of the currently selected item. For example, you can set the "src" attribute of an "img" item.',
      //position: 'bottom'
    },
    {
      element: document.querySelector('[data-id="itemStyles"]'),
      intro: 'Finally in this section, you can define the styles for the selected item. Size, color, shadows, gradients and many more.',
      //position: 'bottom'
    }]
  }).setOption("dontShowAgain", true).start()

}