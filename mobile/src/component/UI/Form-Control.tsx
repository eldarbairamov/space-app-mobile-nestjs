import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { gStyle } from "../../asset";
import { Controller, RegisterOptions } from "react-hook-form";
import { emailRegex, onlyLettersRegex } from "../../constant";
import Toast from "react-native-toast-message";
import { useState } from "react";

interface IFormControlProps {
   label?: string;
   name: string;
   control: any;
   errorMessage: string | undefined;
   isRequired?: boolean;
   isEmail?: boolean;
   isPassword?: boolean;
   isTextLimit?: boolean;
   isOnlyLetters?: boolean,
   isCenter?: boolean,
   isChangeValueOff?: boolean
}

export function FormControl({ label, name, control, errorMessage, isRequired, isEmail,
                               isPassword, isTextLimit, isOnlyLetters, isCenter, isChangeValueOff }: IFormControlProps) {

   const [ isPasswordHidden, setIsPasswordHidden ] = useState<boolean>(!!isPassword);

   const passwordValueCondition: string = isPasswordHidden ? "[ показати ]" : "[ скрити ]";

   const rules: RegisterOptions = {
      required: isRequired ? "Поле обов'язкове для заповнення" : false,
      pattern:
         isEmail ? { value: emailRegex, message: 'Недопустимий формат' } : isOnlyLetters ? {
            value: onlyLettersRegex,
            message: 'Недопустимий формат. Тільки букви'
         } : undefined,
      minLength:
         isPassword ? { value: 6, message: 'Не менше 6-и символів' } : isTextLimit ? {
            value: 6,
            message: 'Не менше 6-и символів'
         } : undefined,
      maxLength: (isPassword || isTextLimit) ? { value: 20, message: 'Не більше 20-и символів' } : undefined
   }

   const showErrorMessage = () => {
      errorMessage && Toast.show({ type: 'error', text1: errorMessage })
   }

   const showHiddenPassword = (): void => setIsPasswordHidden(!isPasswordHidden);

   return (
      <View>
         <Controller control={ control }
                     rules={ rules }
                     render={ ({ field: { onChange, onBlur, value } }) => (
                        <View style={ [ styles.form_control ] }>
                           <View style={ [ styles.label_wrapper, { justifyContent: 'space-between' } ] }>
                              <View style={ { flexDirection: 'row' } }>
                                 { label && <Text style={ [ gStyle.second_font, styles.label ] }> { label } </Text> }
                                 { (isRequired && label) && <Text style={ styles.required }>*</Text> }
                              </View>

                              { !!isPassword
                                 && <TouchableOpacity activeOpacity={ 0.5 } onPress={ showHiddenPassword }>
                                    <Text style={ [ gStyle.second_font, styles.label ] }>
                                       { passwordValueCondition }
                                    </Text>
                                 </TouchableOpacity>
                              }

                           </View>
                           <TextInput
                              secureTextEntry={ isPasswordHidden }
                              style={ [ gStyle.regular_font, styles.input, isCenter && { textAlign: 'center' } ] }
                              onChangeText={ !isChangeValueOff ? onChange : undefined }
                              onBlur={ onBlur }
                              value={ value }
                           />
                        </View>
                     ) } name={ name }/>
         { errorMessage &&
            <TouchableOpacity style={ styles.error } onPress={ () => showErrorMessage() } activeOpacity={ 0.5 }>
               <Image style={ { width: 20, height: 20 } } source={ require('../../asset/image/error.png') }/>
            </TouchableOpacity> }
      </View>
   )
}

const styles = StyleSheet.create({
   label_wrapper: {
      flexDirection: "row",
   },
   label: {
      marginLeft: -4,
      alignItems: "flex-start",
   },
   form_control: {
      gap: 15
   },
   error: {
      position: "absolute",
      top: 27,
      left: 230,
   },
   input: {
      marginLeft: 4,
      borderBottomColor: "#e3e3e3",
      borderBottomWidth: 1,
      width: 250,
      padding: 1
   },
   required: {
      color: "indianred",
   }
})