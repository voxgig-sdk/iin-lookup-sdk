package core

type IinLookupError struct {
	IsIinLookupError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewIinLookupError(code string, msg string, ctx *Context) *IinLookupError {
	return &IinLookupError{
		IsIinLookupError: true,
		Sdk:              "IinLookup",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *IinLookupError) Error() string {
	return e.Msg
}
