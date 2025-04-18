const A="data:image/png;base64,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";export{A as default};
