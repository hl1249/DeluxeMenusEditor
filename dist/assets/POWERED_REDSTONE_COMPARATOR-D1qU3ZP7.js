const A="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAI4AAACOCAMAAADQI8A6AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAADbUExURUdwTMYAAJUAAHZ2dqWlpX19fY+Pj6CgoISEhK2trU9PT2pqaoCAgGBgYEtLS2RkZJqams/DtcHBwWNjY8nJydfIu9nHumhoaJaWllZEKCMcEC8lFjgAAHNaNcipAHVcN8jIdjQqG3Nzc1ZWVlhFKZZUAGcAACcfFCoAAIqKiuigmEcAAIkAACAAABgAAEMAAH9/f+abkl5eXutwaOSXjpiYmFQAANcCB64AAchwADMAAJZ/APgDANIAAigAAPr6+kdHR9IAAOxzbaehpYyFivgBAdIABqWdo4AWBgd8HZoAAAABdFJOUwBA5thmAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAGxElEQVR42u3aaVfbSgwG4MaJg+2sTQphK1uBkLJ1BwrclrL0/v9fdKWR5NEYh9VOcs6d94sLbZ2H8ViSE9688fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8SkxwZRfv1LRmGD6HAT9giBmqpwKcyoV0ATB1DmwMBUOa4J/pydCxprL2QmmzFlbs5ydnRngrJ0R53xnRjhnZ5Xg/HyGOEFlNjgbyAED/BE4i4vT5mxsrAXEqSwuzgJnI4fj9I43kyLmcVTvwOZhOtmkVizKctTCmd7xa4K9I4oiXB/L2d3lC5XtHRO4YPV6HTn0mnjc3WWOTaBSNgYzhsOtgzmmHAXlXqYIMHGc5YS2OspfcXUMSsVA5mLhHBwgCDTLYRjaYo1/lRbrsjhVCGIw8fv3lcrBAXKCYHd52eWcnZ2fl8uJqpR4jvIewpylZcsxveNMesfOYjkcc40QgwFMr4eclRXgLC0ZThyH2d6xQ8W6cE6vR3umFlPe9YSzsrKUcuIxvSMoGoMBDAYxmN66yxnit8e3sgLLTI9ToxjNu7n19XXLGQ6Hf82373NKqHn3QLB7gLO+SZztIXL+/sVrWHE5u8VuYOJEkdEAIsPZ3FxZ2t5mDlxH4MD1SjlUrAuteYjB9PgGVxcLOZvbzOFdntM7iqp5kQqUFaN5xzHLYzknJydGc53l3BRWgBUopCgMJuWcUOLra+EcBMK5uSniMlUVCA5GIzd5t9tFzcLCguFcXFwYzenp6fU19o6AijVwlpdvbmDvFdEnq25CKYFdygLngoIYjOodAVZHHkdevWfgFavcFfCIXTOm5dEYAV1eXhrNXdo7Ai7WRgMneM2e4RXo8opI24x56yxkckk5vbu7y+kdMZ/0RZeJV6TLG0SDoPQg5jsEER8hePwMQc3V1VUeB/8n776XzlZqRVIQV+bvnI+cz5wrCrQOxRkO5Sx8bz4bowQahNWYCvMcYt5CEDMPQQweAXN7i9VROFgdaY2fC2JMLbMk8qU0K/7yLWee8pWPH2+JA60DOFSscQPKSZ4Kwn8U8QSRA8Jv/wPhAiiYPxDEYBCDuc32jq6cxZz8KSD+N7wCteymEQxkHz2yMn9MFr5S5nkrzbscqVayvo+CuAekmJxdvA9BDIavlbk4gMHQ4pjlMUfLkVquL/iDoAb3JEcDK6JA+5QffDQe2ivfvlHZkT0kx5A4/LphXc7Fr8EdMMnjNBrcIBXI3UPHx4jBwHFvj/cOYjCA4U0tR3O2TYvByEojhi5HkozhNCJ383QFxp5jyA/KHqQqO5k48lUoR0EoDHp42fkObiUPcCIFMr3BASFndRUwP38aTlWB3mqExmAUhq+7YFqPcFKQtCoFIs7q6s+UI6B63VmRMLMiMbXPuqyzxYzldISjQPb+NqDVHA6C6LUUxl0ROgti6MfSmPGcTkc4UZPPG8caNAcSyzk6qhPn0yd5XWdJul25PO4PxVNLv/Uop9MRTvM+CNYYKYfEOYKY6eWTiQWlGAzvlTmNMYNlv99XmrEcBjWbAooiNVcYzuHhqlkbw6nXXU6tJhvWcHr80CHPZTxYDgbCSZJHOAbUpIS0VimIOYd7ioMgi8FIrev2+JFMHhR50h0MhNNOxnM0qCnh5ytZH4dTS5dCY9KqAEvLT/Ty5GpONhgIp91uP4BxQE0LkruDfuSUU3OWQmMMiLcev9+RggYD4bTbzHmwp+eAeOKWAmY40ge76UxVy0RuMl5fo+n3hdNuM+fRiYc5X76oBaL7Qcr7oQh4qh8H4h3F69tr9YXTljxpHmSOAjVRkxY0O3ZIH8kDSQWi91friCHO8zACAs7WVuaS5YDcJlvLjDJ1qcD9PnOS5LkYAhmOBUW5oEyTVSOJ0fCDY0s0fdy7z8dgmCOgSN7hUSDeO2MGtlCe7VvCofv6JRgD2tqyIL5DaDMISDZyBiR1x2hM9bUY4Lz4KZ05jQZzABRlKnVm08i3ee9UuTNZTPKq9zCYk84e0UhGkDxQbCc9o2nptv16DIMaDQsajUZRpttnn5llaioBY0CNhgWNMGEOSN7miNzpqmiMDK4MGo1yQfK+yz3Mhw9FYxwQc9IJNpRJbwyGOYV/NOKC1EidPpflYgynlA+xNIhmRg0STDp2fuCUg1GgTmckI6yALIY5v3+zptRPY5mjRtgshsbO38wp/YNz5qgR1sXQ2EmciXyS38hMjFSQkoQ1pmMjZ2K/COKOsHj98Ga2GORM9DdTxNNwOc+f9IoFgcRypocRkJSiJB06p4QhUMqZPkZX6pnAWNCMYAQ0MxgCzRDG5/+Z/wBbkkf6mZOU5wAAAABJRU5ErkJggg==";export{A as default};
