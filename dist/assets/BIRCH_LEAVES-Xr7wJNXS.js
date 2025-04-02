const R="data:image/png;base64,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";export{R as default};
