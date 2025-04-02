const A="data:image/png;base64,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";export{A as default};
