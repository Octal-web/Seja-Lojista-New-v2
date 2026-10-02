<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PostStoreComplete extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'nome' => 'required|string|max:255',
            'cargo' => 'required|string|max:255',
            'possui_socio' => 'required|boolean',

            'email' => 'required|email|max:255',
            'telefone' => 'required|celular_com_ddd',
            'telefone_confirmacao' => 'required|same:telefone',
            'cep' => 'required|formato_cep',
            'entrada' => 'nullable',
            'posicao_formulario' => 'nullable|string|max:255',
            'politica' => 'required|accepted',
            'expectativa_investimento' => 'required|integer|in:2,3,4,5,6,7',

            'origem' => 'nullable|string|max:2048',
            'campanha' => 'nullable|string|max:255',
            'grupo' => 'nullable|string|max:255',
            'anuncio' => 'nullable|string|max:255',
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'nome.required' => 'Por favor, informe seu nome.',

            'cargo.required' => 'Por favor, informe seu cargo.',

            'possui_socio.required' => 'Por favor, informe se possui sócio.',
            'possui_socio.boolean' => 'Por favor, informe uma opção válida.',

            'email.required' => 'Por favor, informe seu e-mail.',
            'email.email' => 'Por favor, informe um e-mail válido.',

            'telefone.required' => 'Por favor, informe seu telefone.',
            'telefone.celular_com_ddd' => 'Por favor, informe um telefone válido.',

            'telefone_confirmacao.required' => 'Por favor, confirme seu telefone.',
            'telefone_confirmacao.same' => 'Os telefones informados não coincidem.',

            'cep.required' => 'Por favor, informe seu CEP.',
            'cep.formato_cep' => 'Por favor, informe um CEP válido.',

            'politica.required' => 'Para continuar, você deve concordar com os termos.',
            'politica.accepted' => 'Para continuar, você deve concordar com os termos.',

            'expectativa_investimento.required' => 'Por favor, informe o capital disponível.',
            'expectativa_investimento.integer' => 'Por favor, informe uma faixa de investimento válida.',
            'expectativa_investimento.in' => 'Por favor, informe uma faixa de investimento válida.',
        ];
    }
}
