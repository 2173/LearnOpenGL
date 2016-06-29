#version 330 core
//������ͼ
struct Material
{
	sampler2D diffuse;  //���������ɫΪ�������ɫ
	sampler2D specular; //
	sampler2D emission; //�Է���
	float shininess;
};

uniform Material material;
uniform vec3 lightcolor;
uniform vec3 lightPos;
uniform vec3 viewPos;

in vec3 Normal;  //��������
in vec3 fragPos; //Ƭ�ε�λ��
in vec2 TexCoords; //��������
out vec4 color;

void main()
{
	//����һ�£��������ɫ�� ������ + ɢ��� + ����� ��������⣩
	//ɢ���;������Ӱ�����ӡ� ���յ���ɫ�����ʵ���ɫ����
	//Ӱ�����ӣ� 1.�����⣬������ͣ�����Ӱ������������ɫ�Ĺ�
	//          2.ɢ��⣬�ɹ����ڲ����ϣ������������Ĺ⣬���۲�ĽǶ��޹أ�Ӱ��������������ߺ�����㴦�ķ��ߵļнǾ�������ˣ�cos��a������
	//			 �Ƕ�Խ������ԽС�������ԽС
	//          3.����⣬Ӱ�������ɷ��������ߣ�����������������������ĽǶȾ�������ˣ�cos��a���������Ƕ�ԽС�������Խ��
	vec3 fragdiffuse = vec3(texture(material.diffuse, TexCoords));
	vec3 fragspecular = vec3(texture(material.specular, TexCoords));


	//������(���ڻ�����̫ǿ����С��)
	vec3 ambient = lightcolor * fragdiffuse * vec3(0.5f, 0.5f, 0.5f);

	//ɢ���
	vec3 normal = normalize(Normal);
	vec3 lightDir = normalize(lightPos - fragPos);
	float diff = max(dot(normal, lightDir), 0.0f);
	vec3 diffuse = diff * lightcolor * fragdiffuse;

	//�����
	//material.shininess�߹�ķ���ֵ(Shininess)��һ������ķ���ֵԽ�ߣ�����������Խǿ��ɢ���Խ�٣��߹��ԽС
	vec3 viewDir = normalize(viewPos - fragPos);
	vec3 reflecDir = reflect(-lightDir, normal);
	float spec = pow(max(dot(viewDir, reflecDir),0.0f), material.shininess);
	vec3 specular = spec * lightcolor * fragspecular;
	//�Է���
	vec3 emission = vec3(texture(material.emission, TexCoords));


	//�����ɫ
    vec3 result = ambient + diffuse + specular + emission;
	
    color = vec4(result, 1.0f);
}
