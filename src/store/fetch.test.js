import { shallow } from 'enzyme';

const shallowWithStore = (component, store) => {
  const context = {
    store,
  };
  return shallow(component, { context });
}

export default shallowWithStore;


// describe('ConnectedShowBox', () => {
//   it("should render successfully if string is not provided by store", () => {
//     const testState = {
//       showBox: {}
//     };
//     const store = createMockStore(testState)
//     const component = shallowWithStore(<ConnectedShowBox />, store);
//     expect(component).to.be.a('object');
//   });
// });
