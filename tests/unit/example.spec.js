import { createLocalVue, mount } from '@vue/test-utils'
import Vuex from 'vuex';
import ProductListItem from '../../src/components/ProductListItem.vue'

const localVue = createLocalVue();
localVue.use(Vuex);

let actions;
let store;
let mutations;

const data = {
  allProducts: [],
};


describe('ProductList.vue', () => {

  beforeEach(() => {
    actions = {
        "getAllProducts": jest.fn(() => Promise.resolve()),
    };
    store = new Vuex.Store({
        actions,
        mutations,
    });
    mutations = {
        "GET_ALL_PRODUCTS": jest.fn()
    }
});

test('GET_ALL_PRODUCTS', async () => {
  const state = {
    allProducts: [],
  };      
  expect(state.allProducts).toStrictEqual(data.allProducts);
});
})

describe('ProductList component', () => {
 test('renders aProductListItem component with all products props', () => {
  var product = {
    familyRecord: "1",
    familyId: "344232",
    modelCount: "8",
    fmyMarketingName: "Galaxy Tab S7 (11.0\", Wi-Fi)",
    fmyEngName: "Galaxy Tab S7 11.0 Wi-Fi",
    categorySubTypeCode: "01020100",
    categorySubTypeEngName: "Galaxy Tab S",
    simplePdYN: "Y",
    oldProductYN: "N",
    productGroupId: "galaxytabs7t870",
    optionPriceUse: null,
    iaCtaDisplay: "Y",
    wtbOnlineDispFuncUseYN: null,
    chipOptions: [],
    awardList: [],
    quickLooks: [],
    modelList: [
      {
        thumbUrl: '//images.samsung.com/is/image/samsung/p6pim/nl/sm-t870ndbaeub/gallery/nl-galaxy-tab-s7-t870-344232-sm-t870ndbaeub-thumb-388780700',
        ratings: '4.87',
        priceDisplay: '699',
        pviTypeName: 'Modal',
        pviSubtypeName: 'Tablet',
        usp: [
          "11 inch display",
          "120 Hz",
          "Inclusief geavanceerde S Pen"
        ]
      }
    ]
    }

  const wrapper = mount(ProductListItem, {
    propsData: {
      product: product
    }
  })

  expect(wrapper.props().product.fmyMarketingName).toMatch("Galaxy Tab S7 (11.0\", Wi-Fi)");
  expect(wrapper.props().product.modelList[0].priceDisplay).toMatch("699");
  expect(wrapper.props().product.modelList[0].ratings).toMatch("4.87");
  expect(wrapper.props().product.modelList[0].thumbUrl).toMatch("//images.samsung.com/is/image/samsung/p6pim/nl/sm-t870ndbaeub/gallery/nl-galaxy-tab-s7-t870-344232-sm-t870ndbaeub-thumb-388780700");
  expect(wrapper.props().product.modelList[0].pviTypeName).toMatch("Modal");
  expect(wrapper.props().product.modelList[0].pviSubtypeName).toMatch("Tablet");
  expect(wrapper.props().product.modelList[0].usp[0]).toMatch("11 inch display");
  expect(wrapper.props().product.modelList[0].usp[1]).toMatch("120 Hz");
  expect(wrapper.props().product.modelList[0].usp[2]).toMatch("Inclusief geavanceerde S Pen");
});
})

describe("Snapshot tests", () => {
  test("ProductListItem Component", () => {
    var product = {
      familyRecord: "1",
      familyId: "344232",
      modelCount: "8",
      fmyMarketingName: "Galaxy Tab S7 (11.0\", Wi-Fi)",
      fmyEngName: "Galaxy Tab S7 11.0 Wi-Fi",
      categorySubTypeCode: "01020100",
      categorySubTypeEngName: "Galaxy Tab S",
      simplePdYN: "Y",
      oldProductYN: "N",
      productGroupId: "galaxytabs7t870",
      optionPriceUse: null,
      iaCtaDisplay: "Y",
      wtbOnlineDispFuncUseYN: null,
      chipOptions: [],
      awardList: [],
      quickLooks: [],
      modelList: [
        {
          thumbUrl: '//images.samsung.com/is/image/samsung/p6pim/nl/sm-t870ndbaeub/gallery/nl-galaxy-tab-s7-t870-344232-sm-t870ndbaeub-thumb-388780700',
          ratings: '4.87',
          priceDisplay: '699',
          pviTypeName: 'Modal',
          pviSubtypeName: 'Tablet',
          usp: [
            "11 inch display",
            "120 Hz",
            "Inclusief geavanceerde S Pen"
          ]
        }
      ]
      }

    const wrapper = mount(ProductListItem,{
      propsData: {
        product: product
      }
    })

    expect(wrapper.html).toMatchSnapshot()
  })
})
