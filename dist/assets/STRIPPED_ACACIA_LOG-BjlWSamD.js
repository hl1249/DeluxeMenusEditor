const A="data:image/png;base64,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";export{A as default};
