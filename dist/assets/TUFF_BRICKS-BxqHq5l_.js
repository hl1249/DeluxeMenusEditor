const A="data:image/png;base64,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";export{A as default};
