const A="data:image/png;base64,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";export{A as default};
