const A="data:image/png;base64,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";export{A as default};
