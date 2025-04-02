const A="data:image/png;base64,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";export{A as default};
