const A="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAMAAADVRocKAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAA5UExURUdwTOTg3vfs68/ExaShn5qUk19bW2VjYmJfX5+amvz49V1ZWZeQkNrMy/Xt7VtXV5OMjO3k4sW2tqzpCaMAAAABdFJOUwBA5thmAAAAtGVYSWZJSSoACAAAAAUAGgEFAAEAAABKAAAAGwEFAAEAAABSAAAAKAEDAAEAAAACAAAAMQECAA4AAABaAAAAaYcEAAEAAABoAAAAAAAAAGAAAAABAAAAYAAAAAEAAABQYWludC5ORVQgNS4xAAMAAJAHAAQAAAAwMjMwAaADAAEAAAABAAAABaAEAAEAAACSAAAAAAAAAAIAAQACAAQAAABSOTgAAgAHAAQAAAAwMTAwAAAAAGOkJsRSTv3MAAAAFnRFWHRTb2Z0d2FyZQBQYWludC5ORVQgNS4x94P3kwAAAAlwSFlzAAAOwwAADsMBx2+oZAAABepJREFUaN7Nmoly6joMhk8gduwmLOX9H/Zau7wk0BZmrmdOIRzQF2v5pQT+/fufrev1o+a/rmV9fc68rs+ZP5X1GQS4Bs0T4vrmWKDv0fblgg/vjYU653S+wDq911FoaSrrdIZFCDh+D0LNT8Xu+UxeKmt6D+JKzim28NQlyMhSxPUvmcOhRedMJ1voLETgm35v3nyP1tD3uovLXxDf399kfkLzYHLS1SPK23929uUD3xhcNc8A2UqDgPdff+YczJDevHlLEecfOkp9v2O+QVj8X0MMfM/mH48HWfaIyTL4pVh8gS8579uzLwAJsiEII3VxOmHsXtEcWF9m/lJZZMSjcdTjiUa15vFQRIKTZbJnj4dsiRB4fIBozNMbW/OidYKwWMCnDxHbAHA6HQMsEtRHG0CqAVtWxHSAGJk/jcwvqQPkbNLcIdogW4GRzSbIyzIEFASk2VQn92TH3vylLTZ8hmkaYw+43xEQghWair45SgqtNg+vn/EACy0lBKzrGBCySsX0klRYC8UPljMHQEr7gPwU0TjH5owruqYA0jFgnq8HsdiVCDBvgC4GGGYB5LwfC32GzsG0Y98/A2we4BzVlp5vNtj0YYFNBaSXAIxoq3vYkWN0ALbfAu4eMHNE9scWNxldwSkKiHEPAHEOsACACKANBi+LO2lOehkQeHlAnpvR0bwlmqNeX1YCYCBSbNO0B2T2V6O050ZzdK0IgJ3gpvo66ACZAAVB4cY5w8Z3dEr54wG4k5cAguCnMsjYBUiM7HUHoMcRQMqMopwdQQNSX0JRXBnACAovI2+3HcC8BwjBLgIlcZbF78EVQ4wjwMz+oUroARyLr5R6QKwAsQOwLQ/gtW0OALFgT1cAS34FNGqK+tACsA42IBggrw4Q9fzhIDpAJ9fsCgcIHhBIRRpAdIA1ekDaA2TK0UwsBAQE8NEGgJsHUCkUKgAWylEC3IYAeUSbklp4gHVdtnO7OQCdMTh8BfuLq4PbMQANb1uxS7ZxMwpYBwB38sM6yIO8B0CgSOQgOVUAaw/w/SDtFBoF1wPCJmcOYH5kQKwA8RWAnr4B5PSz60IIiBJitOYB6QigMjejM/zpzx5wuzlA5S2n3Q2AMrIGbNagnTbVABLO1VXyLgD9IYByYIB5HyA1ZZUcZVMDQPCAcACQEHsAbUJ2EgdqWvX7PUB5ZQjgSmYFxMdGKgSg2QIA0vBZcpfABODmPgCQNsErPSBXQ9FGe5iNEBSAya+9he0bYFk7wJ2ScvZTF1eySUgIdwCs3Oyd9HPZqd/AfjsXVb149g06O8D9jrJTA3it0QPSHkC24QBayQJYPIBDzm46BKhKZIloA8gbANj31u4VsEqQewC622TIy1EF2DbRHD9NUFrSHnYBxSmcKg6wsYS0ACedlvcIoFdRvjuAFrHsBavtGUCGFgQskrkdwJTaZxOXM/kJAOUqggHRA7japPTiywBSPBeIkkVo05WxK2cOQGIlfwLIHjBXADGxDxjcSvDThJXzRnoR5BgA3DClmXnAcgDYsrXK8scDtgqwOoCKG2n2cgxgSWjHFAcIAohOlgVAT2PcAdw9IHhAcACSCm0GOE+7pmZD8OhuS3AATpzNgsx1UQAyr2iZ6ehI2ZX0P0da1ADo9LWRbgqQeYhylqUBASmOAf/u4pUaUHXqsh8ArBUADeroKLEoT7v7jgaQIPPpB8lgjDh5Iy0DgAv2MrxzmplggG5UYoBc1/QAKvLde78iCdAvEWDj/BOAZk9srl/3dlFNFbOM1uXfCmOXAmKs5iF48en9dwOITAe+YEPgzQO4Ga+Wni99g0AxcIAg4zwDnOwLYO0V+mgF62TZAQICVtOcWHXLH32Lw1mkeaUA6Vty4S1Z9DPz5Ch2ksZ9PgD86ps0uwYh/eML8dQDfv1doNOPzICUOsCfvs0Mcg9D5LyaWLo7Z79ZPcC0+g/O8YvuYQiAht83mudYiGQ44Xzrt/oeQMLz9t8lCAC06APmCSFi97HfhhDgo79uyZ81/4v1H/EDqQ2S1FrMAAAAAElFTkSuQmCC";export{A as default};
