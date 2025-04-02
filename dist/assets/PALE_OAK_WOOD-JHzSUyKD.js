const A="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAMAAADVRocKAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAA5UExURUdwTEdAP21jYU1CPysnJx8aGTIrKSUhIF1STzw1MxoXFismJRcUEyUhH0I6ODkyMDEtLFBJSHxxbwyqbvoAAAABdFJOUwBA5thmAAAAtGVYSWZJSSoACAAAAAUAGgEFAAEAAABKAAAAGwEFAAEAAABSAAAAKAEDAAEAAAACAAAAMQECAA4AAABaAAAAaYcEAAEAAABoAAAAAAAAAGAAAAABAAAAYAAAAAEAAABQYWludC5ORVQgNS4xAAMAAJAHAAQAAAAwMjMwAaADAAEAAAABAAAABaAEAAEAAACSAAAAAAAAAAIAAQACAAQAAABSOTgAAgAHAAQAAAAwMTAwAAAAAGOkJsRSTv3MAAAAFnRFWHRTb2Z0d2FyZQBQYWludC5ORVQgNS4x94P3kwAAAAlwSFlzAAAOwwAADsMBx2+oZAAABmBJREFUaN7Nmut2ozoMhccEY4wJSfv+D3usLckW2CRp06x1/CM3ZvRhXbYE9N+//9kaho+anwdanzNP63OILS9GfOf1Ad8P23a5XOY5v3z/OYIdM1zKIsLlA76HccP5O/NAsPn9Vt42D7frFvizIGYKR3557+zpJG832CoAQZSdXd5zzg0LIPiEbVbC7x1VzvBWFyMq6A3EbJfar67iqtNt4PvPQjtrCMUEn34NwIalAPn+k8yRRSaG7+qI4YC4Hb6/7BwEEX7YIAs1soKgl03dpoiXZHCe56MjBIEi44MIAG3AIthlTxCbiWxB3G4KYDnlEG8FAMRWwj7MDwW5QdSzvOE45yj+pcnfw389E+Rh22c4+9raQWxM/tZ9GETXUTu9lK326myvEuQas4sakGYXUdHSVfYAtaKH5mrGHJePig57QIyaH5Lc1UVzDehWfzRbqd5BUsCFY2gAgqiZZ2wwQqvXFoMgDj1pHLuAaToghoFLQC1zDsGISTSpi+K0SwgtwDkAsAu4Q/4Liuy7Cs9F+74VpmGXpMvyEBDjVlZFzMW3VqIr4rv6fgEghB4gAbBDYIIwJg+Nps5J3+p7AEIDgOGUnMQCvpaqrU4x8m1KBrvEZ+8BWB8BxFXTpGYlopeiRCbBCgLvIQCwrgToZ9HVACSjDpl6FKraQumUC2DtBBmAa5RY9BHzfhkfsU8UsK4nWZQB4qovAGK0CBQHb+OQq96L/R8Avr4mTlrt80aWRfQUkO16Np8B3j8CpGQAORScUogvGR+MrpYIwK4P9a0AlgMgkWHeQ84mAjAh76Rq0BHhrf0R21hznmZAfjsCaF2v17RLV7w4t5kGB7UCUvxyV/fTe1gIkNc5gJZNVwKkpOEufWaTuN7vBpDXCSAlA4ixBaS4bxKSOMvSAEIAwPsDAFauIFSAMwCbtF4ycyHAuAMEAMaxA3ARAAp0ATgHAKj5V0bAICQzA8T3OwDJdRcQO4D8lgFIL/rCVasGu4BuPzgAsrEKyIQKiOr7BqDmlyeAHIgoqwAmQ1UrOGEDCI8BkwGkU0AEYBQrsBYsgJm+C5iiBbgWoAh2zapdxQKwKY5/D8CCzbXsSo929ferKwDuKtjGGIIBsHI8AVwtQOUPAAcAZ3qgYtVtCEA0T1LqESA2gKQAKaVlbQCetYkbjz8FpKvJojOACk6Q0Iqo5vdFW0MPgILaZVEs6xTAQabK9ZpdPQCMkOawmrJRN6mzeHMMkALbASANnoei+10C0QekaABEcM7tAKMBLJqbBKCag/gRIFdDBxBFNVnZAJBSSBJ/BiwLA2qQqUMaAH05AMTdFuBYSoESJSdR7QI4LFjoD/j0CIDCdtI0c2/G75wBOn4SYC3nj+J+CnAR3RIAcQ3m4fyNN6UAqbXVADx2lMEPAW6SxlMByUnr1ONk3wA4zjyuwGXocD3AZIOqzYz7vwFMkyq1dPYGIFm2tgCyWQAIMqkoAeCyDgDnycJwALRTRQvI5w6ZxjTAQ1g+0gJQYDzPLes5ALOoNGBXMnPSOYnHPKB7AC5rqWyZKw5SUQARr64MMRUgxw0gcEGFxQLCUwCHmyJcAXlUNQC2Qe/8BVdNvwBM0QDK8UXaL2xLZ/ZqU+X7KYBnutKjLUBbIgF4VBm9BXCQid4CJjtSRwOIDECuGkAR0vzL3QL80gAcG2DbV9GgOgQ8A2R9IMConb8DcGWWRvbD1teX9mi+4jGAOnvBJQAsOjwS4ORWAlebSn8F8BVPKgAesBgAB93vCtSrzQcAJigg1jEG2qpDIipYB4qXAdm4aFAFiDBJn5hUoX8LcNEC0gmAm7xcvq6vAP653b2KAigzDB9PBOAswhSk+X+vWYXwEKC571gBSE8y+sUdzoxfKdXZkwAiEGMD6N45bQAu1Z+6gNUAJCYAnN77PQPorwzQ6yULKFl1vFHUIPoAuZfRAMDQtOUMfnr/nafSqzrlEUBaJQM46C89QYhFiya5tIo9QOnFdYh/+RlIBUwmyNlvBLgDwL3Ymz4QfvQUpwGg/+R3DLej7MM2mh8/h5JrhAqYUgH4EtKwvhjaU8RkAMkCJCn9y6E9QZhw7ABjBbz1NPM54O3nsTahGGBvfvzJE2WuOQXwlf3SUeT3ECqs5i7Lnz7VbwF//ncJe8BH/rKiAj72tyEM+Ohft8TPmv/F+g+MY7pp9OFd/AAAAABJRU5ErkJggg==";export{A as default};
