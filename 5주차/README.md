# Redux란?

이 글은 Redux를 처음 접하는 분들을 위해 쓴 글입니다. 이해하기 쉽도록 풀어쓸 예정입니다. 오개념이 있다면 정정 부탁드립니다.

---

리덕스란 js앱을 위한 상태 관리 도구입니다. react 뿐만 아니라 Angular, jQuery, vanilla등 다양한 프레임워크에 적용할 수 있도록 설계되어있습니다.

## Redux를 사용하는 이유

react는 뷰를 담당하는 라이브러리입니다. view를 구성하기 위해서는 상태(state)가 필요합니다. 특히 리액트는 컴포넌트 재사용성을 위해 정보 구조에 따라 여러 컴포넌트가 만들어 질 수 있습니다. 이에따라 state 또한 계속해서 전달해야 합니다.

문제는 프로젝트의 규모가 커질 때 입니다. 다양한 종류의 state가 더해지고, 복잡한 비즈니스 로직을 구현해야 합니다. 다양한 state는 넓게 퍼져있는 state에 전달해주기 위해 상위 컴포넌트에 몰아서 위치할 수 밖에 없습니다. 따라서 상위 컴포넌트는 비대해지고, 관리하기 어렵고, 실수하기 쉬워집니다.

이를 해결하기 위해 전역적으로 상태를 관리해주는 툴인 redux를 적용하는 것입니다.

## Flux 패턴

Redux는 Flux라는 디자인 패턴에 영감을 받아 개발되었습니다. Flux는 client-side web-app을 구축할 때 사용되는 앱 구조입니다. 기존 MVC에서 대규모 프로젝트에서 너무 복잡해지는 정보의 구조를 개선한 단방향으로 데이터가 흐르는 구조입니다.

## Redux에서 알아야 할 키워드

- Action
  Action이란 redux의 상태를 변경시키기 위한 동작입니다. 일반적으로 액션의 종류를 나타내는 type과 액션을 실행시키기 위한 값을 전달하는 payload로 이루어져 있습니다.

```js
{
    type: "INIT",
    payload: 0
}
```

- Reducer
  Reducer는 특정 액션이 발생하면 특정 행동을 하는 함수입니다. 액션에 따라 상태를 어떤식으로 업데이트 할 지 정의합니다.

```js
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "INIT":
      return {
        ...state,
        count: action.payload,
      };
    default:
      return initialState;
  }
}
```

- Store
  Store는 redux가 만든 전역 상태이며 특정 action에 대해 상태를 변화시켜주는 reducer도 포함되어 있습니다.

store.js

```js
const initialState = {
  count: 0,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "INIT":
      return {
        ...state,
        count: action.payload,
      };
    default:
      return initialState;
  }
}
```

- Dispatch
  react Hook에선 useDispatch를 통해 액션을 발생시킵니다.

app.js

```js
const dispatch = useDispatch();
useEffect(() => {
  dispatch({ type: "INIT", payload: 0 });
}, []);
```

하지만 액션의 타입과 payload를 일일이 적는 것은 불편하고 변동사항이 있을 때 관리하기 힘들 것입니다. 따라서 store에 액션 생성함수라는 것을 정의하여 쓸 수 있습니다.

- 액션 생성함수
  store.js

```js
export const init = (value) => ({
  type: "INIT",
  payload: value,
});

const initialState = {
  count: 0,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "INIT":
      return {
        ...state,
        count: action.payload,
      };
    default:
      return initialState;
  }
}
```

app.js

```js

import { init } from "store"

....

const dispatch = useDispatch();
useEffect(() => {
  dispatch(init(0));
}, []);
```

- 액션 타입 정의

store에 여러 로직이 추가되면 액션이 굉장히 많이 만들어 질 수 있습니다. 이 때 액션 타입을 한눈에 보기 위해 액션 타입을 상수로 정의해두곤 합니다.

```js
const INIT = "INIT";

export const init = (value) => ({
  type: INIT,
  payload: value,
});

const initialState = {
  count: 0,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "INIT":
      return {
        ...state,
        count: action.payload,
      };
    default:
      return initialState;
  }
}
```

지금은 별 의미 없어보이지만 액션 타입이 굉장히 많아지면 액션 타입을 정의해 두는 것이 한눈에 보기가 편하고 수정도 용이합니다.

## Ducks 패턴

프로젝트의 규모가 커지면 store의 규모 또한 굉장히 커지게 됩니다. 쇼핑몰을 예로 들면 인증, 유저정보, 상품정보, 장바구니 정보, 주문 정보, 결제 정보, 관리자 정보, 이벤트 정보, 리뷰 정보 등등 더 있을수도 있습니다.

이들의 상태와 액션을 하나의 스토어에 저장한다면 유지보수가 굉장히 힘들겁니다.

ducks패턴은 리덕스의 스토어를 잘 분리하기 위해 만들어진 패턴입니다. 스토어를 기능별로 나누어서 작성한 뒤 하나의 큰 스토어(rootStore)로 만들어서 관리합니다.

이때 기능별로 나눈 스토어는 module라고 부릅니다.

modules/index.js

```js
const rootReducer = combineReducers({
  products,
  auth,
  user,
  basket,
  order,
});
```

modules/products.js

```js
const GET_PRODUCT_LIST = "products/GET_PRODUCT_LIST";
const GET_PRODUCT_LIST_SUCCESS = "products/GET_PRODUCT_LIST_SUCCESS";
const GET_PRODUCT_LIST_FAILURE = "products/GET_PRODUCT_LIST_FAILURE";

export const getProductList = () => async (dispath) => {
    dispatch({ type: GET_PRODUCT_LIST });
  try {
    const products = await products.getTodoList();
    dispatch({ type: GET_PRODUCT_LIST_SUCCESS, payload: products });
  } catch (e) {
    dispatch({ type: GET_PRODUCT_LIST_FAILURE, error: e });
  }
}

const initialState = {
  product: null,
  products: null,
  popularProducts: null,
  ...
};

export default function products(state = initialState, action) {
    switch(action.type) {
        case GET_PRODUCT_LIST:
            return {
                ...state,
                products: action.payload
            }
    }
}
```

많이 생략된 코드인데요 이 코드는 사실 redux-thunk라는 리덕스 미들웨어를 적용한 store입니다. 자세한건 이 뒤에 알아보겠습니다.

기존 액션 함수는 순수 함수여야 했습니다. 다른 작업은 하지 못하고 액션의 타입과 값을 반환하는 작업밖에 하지 못했습니다.

getProductList라는 thunk 함수는 API를 호출하고 성공하면 성공 액션을 발생시켜서 값을 저장합니다. 즉 비동기 작업을 할 수 있도록 합니다.

## 리덕스 미들웨어
