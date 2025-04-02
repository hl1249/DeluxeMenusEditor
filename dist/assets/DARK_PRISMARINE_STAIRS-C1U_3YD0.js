const A="data:image/png;base64,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";export{A as default};
