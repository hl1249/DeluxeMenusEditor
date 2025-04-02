const A="data:image/png;base64,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";export{A as default};
