const A="data:image/png;base64,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";export{A as default};
