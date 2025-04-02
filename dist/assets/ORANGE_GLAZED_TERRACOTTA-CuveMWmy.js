const A="data:image/png;base64,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";export{A as default};
